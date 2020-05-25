<template>
	<div>
		<Navbar />
		<v-container>
			<h1 class="blue--text text--darken-3">Hola {{ fullName }} </h1>
			<p class="font-italic blue--text text--acent-4">"Bienvenido a EdBookstore la libreria digital de EdTeam"</p>
			<v-row>
				<v-btn
					dark
					color="blue darken-2"
					outlined
					class="mr-4"
					to="/author"
				>
					Gestión de Autores
				</v-btn>
				<v-btn
					to="/book"
					dark
					color="indigo darken-2"
					outlined
				>
					Gestión de Libros
				</v-btn>
			</v-row>
		</v-container>
		<Modal v-slot:default="{ closeModal }">
			<v-card>
				<v-card-title>
					<span>Editá tus datos personales</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-text-field
								label="Nombre"
								v-model="user.name"
							/>
							<v-spacer />
							<v-text-field
								label="Apellido"
								v-model="user.lastname"
							/>
						</v-row>
						<v-row>
							<v-text-field
								type="password"
								label="Nueva contraseña"
								v-model="password"
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
					<v-spacer></v-spacer>
					<v-btn
						color="blue darken-1"
						dark
						@click="updateUser(closeModal)"
					>Editar</v-btn>
				</v-card-actions>
			</v-card>
		</Modal>
	</div>
</template>
<script>
import { USER_UPDATE } from '@/graphql/user'

export default {
	name: 'Home',
	data () {
		return {
			user: {
				name: '',
				lastname: ''
			},
			password: ''
		}
	},
	inject: ['state', 'setUser'],
	computed: {
		fullName () {
			return `${this.state.user.name} ${this.state.user.lastname}`
		}
	},
	methods: {
		updateUser (closeModalAction) {
			if (this.password) {
				this.user.password = this.password
			}

			this.$apollo.mutate({
				mutation: USER_UPDATE,
				variables: {
					id: this.state.user.id,
					data: { ...this.user }
				}
			})
				.then(data => {
					const { updateUser } = data.data
					this.setUser({ ...this.state.user, ...updateUser })
					closeModalAction(false)
				})
		}
	}
}
</script>