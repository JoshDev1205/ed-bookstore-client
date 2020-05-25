<template>
	<div>
		<h1 class="light-blue--text text--darken-3">Bienvenido a la sección de autores</h1>
		<p class="font-italic light-blue--text text--accent-4">"Aqui podrás gestionar a tus autores</p>
		<v-simple-table v-if="authors.length > 0">
			<template v-slot>
				<thead>
					<tr>
						<th class="text-left">Nombre</th>
						<th class="text-left">Páis</th>
						<th class="text-center">Herramientas</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="author in authors"
						:key="author.id"
					>
						<td>
							{{ author.name }}
						</td>
						<td>{{ author.country }}</td>
						<td>
							<v-row justify="center">
								<v-btn
									:to="{name: 'editauthor', params: { id: author.id }}"
									fab
									small
									dark
									color="primary"
								>
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
							</v-row>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<Modal
			icon="mdi-plus-thick"
			v-slot:default="{ closeModal }"
		>
			<v-card>
				<v-form
					ref="createAuthorForm"
					@submit.prevent="createAuthor(closeModal)"
				>
					<v-card-title>
						<h2>Registro de autor nuevo</h2>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-text-field
									label="Nombre"
									v-model="author.name"
									:rules="nameRules"
								/>
								<v-spacer />
								<v-text-field
									label="Páis"
									v-model="author.country"
									:rules="countryRules"
								/>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-btn
							color="red"
							dark
							@click="closeModal(false)"
						>
							Cerrar
						</v-btn>
						<v-spacer />
						<v-btn
							color="blue darken-1"
							dark
							type="submit"
						>
							Registrar
						</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</Modal>
	</div>
</template>
<script>
import { AUTHOR_GETALL, AUTHOR_CREATE } from '@/graphql/author'
export default {
	name: 'List',
	apollo: {
		authors: {
			query: AUTHOR_GETALL,
			update: data => data.author
		}
	},
	inject: ['state'],
	created () {
		this.$apollo.queries.authors.refetch()
	},
	data () {
		return {
			authors: [],
			author: {
				name: '',
				country: '',
				register_by: this.state.user.id
			},
			nameRules: [(v) => !!v || 'Nombre requerido'],
			countryRules: [(v) => !!v || 'Páis requerido'],
		}
	},
	methods: {
		createAuthor (closeModalAction) {
			if (this.$refs.createAuthorForm.validate()) {
				this.$apollo.mutate({
					mutation: AUTHOR_CREATE,
					variables: {
						data: { ...this.author }
					}
				})
					.then(() => {
						this.$apollo.queries.authors.refetch()
					})
				this.$refs.createAuthorForm.reset()
				closeModalAction(false)
			}
		}
	}
}
</script>