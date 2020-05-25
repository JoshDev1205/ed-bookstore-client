<template>
	<div>
		<h1 class="light-blue--text text--darken-3">Bienvenido a la sección de libros</h1>
		<p class="font-italic light-blue--text text--accent-4">
			"Aquí podrás gestionar tus libros"
		</p>
		<v-simple-table v-if="books.length > 0">
			<template v-slot>
				<thead>
					<tr>
						<th class="text-left">Título</th>
						<th class="text-left">Descripción</th>
						<th class="text-left">Cantidad</th>
						<th class="text-left">Precio</th>
						<th class="text-left">Autor</th>
						<th class="text-center">Herramientas</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="book in books"
						:key="book.id"
					>
						<td>{{ book.title }}</td>
						<td>{{ book.description }}</td>
						<td>{{ book.quantity }}</td>
						<td>{{ book.price }}</td>
						<td>{{ book.writted_by.name}}</td>
						<td>
							<v-row justify="center">
								<v-btn
									:to="{ name: 'editbook', params: { id: book.id }}"
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
			v-slot:default="{closeModal}"
		>
			<v-card>
				<v-form
					ref="createBookForm"
					@submit.prevent="createBook(closeModal)"
				>
					<v-card-title>
						<h2>Registro de libro nuevo</h2>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-text-field
									label="Titulo"
									v-model="book.title"
									:rules="titleRules"
								/>
								<v-spacer />
								<v-text-field
									label="Descripción"
									v-model="book.description"
									:rules="descriptionRules"
								/>
							</v-row>
							<v-row>
								<v-text-field
									label="Cantidad"
									v-model="book.quantity"
									:rules="quantityRules"
								/>
								<v-spacer />
								<v-text-field
									label="Precio"
									v-model="book.price"
									:rules="priceRules"
								/>
							</v-row>
							<v-row>
								<v-select
									class="w-full"
									v-model="book.writted_by"
									:items="authors"
									item-text="name"
									item-value="id"
									:rules="writtedByRules"
									label="Autor del libro"
								/>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-btn
							color="red"
							dark
							@click="closeModal(false)"
						>Cerrar</v-btn>
						<v-spacer />
						<v-btn
							color="blue darken-1"
							dark
							type="submit"
						>Registrar</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</Modal>
	</div>
</template>
<script>
import { BOOK_GETALL, BOOK_CREATE } from '@/graphql/book'
import { AUTHOR_GETALL } from '@/graphql/author'
export default {
	name: 'ListBook',
	apollo: {
		books: {
			query: BOOK_GETALL,
			update: data => data.book
		},
		authors: {
			query: AUTHOR_GETALL,
			update: data => data.author
		}
	},
	inject: ['state'],
	data () {
		return {
			books: [],
			authors: [],
			book: {
				title: '',
				description: '',
				quantity: 0,
				price: 0,
				writted_by: '',
				register_by: this.state.user.id
			},
			titleRules: [(v) => !!v || 'Titulo requerido'],
			descriptionRules: [(v) => !!v || 'Descripción requerida'],
			quantityRules: [(v) => !!v || 'Cantidad requerida'],
			priceRules: [(v) => !!v || 'Precio requerido'],
			writtedByRules: [(v) => !!v || 'Autor requerido'],
		}
	},
	created () {
		this.$apollo.queries.books.refetch()
	},
	methods: {
		createBook (closeModalAction) {
			if (this.$refs.createBookForm.validate()) {
				this.$apollo.mutate({
					mutation: BOOK_CREATE,
					variables: {
						data: {
							...this.book,
							price: Number(this.book.price),
							quantity: Number(this.book.quantity),
							writted_by: Number(this.book.writted_by)
						}
					}
				})
					.then(() => {
						this.$apollo.queries.books.refetch()
					})
				this.$refs.createBookForm.reset()
				closeModalAction(false)
			}
		}
	}
}
</script>