<template>
	<v-form @submit.prevent="updateBook">
		<v-row>
			<v-col>
				<h1 class="text-center light-blue--text text--darken-3">
					Actualización de Libro
				</h1>
			</v-col>
		</v-row>
		<v-row>
			<v-col col="6">
				<v-text-field
					v-model="book.title"
					label="Titulo del libro"
				/>
			</v-col>
			<v-col col="6">
				<v-text-field
					v-model="book.description"
					label="Descripción del libro"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col col="6">
				<v-text-field
					v-model="book.quantity"
					label="Cantidad de libros"
				/>
			</v-col>
			<v-col>
				<v-text-field
					v-model="book.price"
					label="Precio del libro"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col col="12">
				<v-select
					v-model="book.writted_by.id"
					:items="authors"
					item-text="name"
					item-value="id"
					label="Autor del libro"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="d-flex">
				<v-btn
					type="submit"
					dark
					outlined
					color="blue darken-2"
					class="mx-auto"
				>Actualizar libro</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>
<script>
import { AUTHOR_GETALL } from '@/graphql/author'
import { BOOK_GETBYID, BOOK_UPDATE } from '@/graphql/book'
export default {
	name: 'EditBook',
	apollo: {
		authors: {
			query: AUTHOR_GETALL,
			update: data => data.author
		},
		book: {
			query: BOOK_GETBYID,
			variables () {
				return {
					id: this.$route.params.id
				}
			},
			update: data => data.book[0]
		}
	},
	data () {
		return {
			book: "",
			authors: [],
		}
	},
	methods: {
		updateBook () {
			this.$apollo.mutate({
				mutation: BOOK_UPDATE,
				variables: {
					id: this.$route.params.id,
					data: {
						title: this.book.title,
						description: this.book.description,
						price: this.book.price,
						quantity: this.book.quantity,
						writted_by: this.book.writted_by.id
					}
				}
			})
				.then(() => {
					this.$router.replace('/book')
				})
		}
	}
}
</script>