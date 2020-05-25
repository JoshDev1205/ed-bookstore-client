<template>
	<Main>
		<h2 class="text-center">Registrarse</h2>
		<v-form
			ref="signUpForm"
			class="pt-4 px-4"
			@submit.prevent="signUp"
		>
			<v-row>
				<v-text-field
					label="Nombre"
					outlined
					v-model="user.name"
					:rules="nameRules"
				/>
			</v-row>
			<v-row>
				<v-text-field
					label="Apellido"
					outlined
					v-model="user.lastname"
					:rules="lastnameRules"
				/>
			</v-row>
			<v-row>
				<v-text-field
					label="Email"
					outlined
					v-model="user.email"
					type="email"
					:rules="emailRules"
				/>
			</v-row>
			<v-row>
				<v-text-field
					type="password"
					label="Contraseña"
					outlined
					v-model="user.password"
					:rules="passwordRules"
				/>
			</v-row>
			<v-row>
				<v-btn
					type="submit"
					x-large
					color="black"
					dark
					width="100%"
				>Ingresar</v-btn>
			</v-row>
			<v-row justify="end">
				<p class="pt-4">
					¿Tienes cuenta?
					<router-link
						class="blue--text lighten-2"
						to="/signin"
					>inicia sesión</router-link>
				</p>
			</v-row>
		</v-form>
	</Main>
</template>
<script>
import Main from '../components/Main'
import { AUTH_SIGNUP } from '@/graphql/auth'
export default {
	name: 'SignUp',
	components: {
		Main
	},
	inject: ['setToken', 'setUser'],
	data () {
		return {
			user: {
				name: '',
				lastname: '',
				email: '',
				password: ''
			},
			nameRules: [
				(v) => !!v || "Nombre es requerido"
			],
			lastnameRules: [
				(v) => !!v || "Apellido es requerido"
			],
			emailRules: [
				(v) => !!v || "Email es requerido",
				(v) => /.+@.+/.test(v) || 'Email invalido'
			],
			passwordRules: [
				(v) => !!v || "Contraseña requerida",
				(v) => (v && v.length >= 6) || "Contraseña minimo de 6 caracteres"
			]
		}
	},
	methods: {
		signUp () {
			if (this.$refs.signUpForm.validate()) {
				this.$apollo.mutate({
					mutation: AUTH_SIGNUP,
					variables: {
						data: { ...this.user }
					}
				})
					.then((data) => {
						const { signUp: { user, token } } = data.data
						localStorage.token = token
						this.setUser(user)
						this.setToken(token)
						this.$router.push('/')
					})
			}
		}
	}
}
</script>