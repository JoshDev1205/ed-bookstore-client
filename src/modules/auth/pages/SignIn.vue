<template>
	<Main>
		<h2 class="text-center">Iniciar Sesión</h2>
		<v-form
			ref="signInForm"
			@submit.prevent="signIn"
			class="pt-4 px-4"
		>
			<v-row>
				<v-text-field
					type="email"
					outlined
					v-model="user.email"
					label="Email"
					:rules="emailRules"
				/>
			</v-row>
			<v-row>
				<v-text-field
					type="password"
					outlined
					v-model="user.password"
					label="Contraseña"
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
					¿Aún no tienes cuenta?
					<router-link
						class="blue--text lighten-2"
						to="/signup"
					>registrate</router-link>
				</p>
			</v-row>
		</v-form>
	</Main>
</template>
<script>
import Main from '../components/Main'
import { AUTH_SIGNIN } from '@/graphql/auth'
export default {
	name: 'SignIn',
	components: {
		Main
	},
	inject: ['setToken', 'setUser'],
	data () {
		return {
			user: {
				email: '',
				password: ''
			},
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
		signIn () {
			if (this.$refs.signInForm.validate()) {
				this.$apollo.mutate({
					mutation: AUTH_SIGNIN,
					variables: {
						data: { ...this.user }
					}
				})
					.then((data) => {
						const { login: { user, token } } = data.data
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