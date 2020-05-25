<template>
	<div>
		<v-btn
			class="mx-2"
			bottom
			right
			fixed
			fab
			dark
			color="blue accent-4"
			@click.stop="changeModalStatus(true)"
		>
			<v-icon v-text="icon"></v-icon>
		</v-btn>
		<v-dialog
			v-model="dialog"
			max-width="600"
		>
			<slot :closeModal="changeModalStatus" />
		</v-dialog>
	</div>
</template>
<script>
export default {
	name: 'Modal',
	props: {
		icon: {
			type: String,
			default: 'mdi-pencil'
		}
	},
	data () {
		return {
			dialog: false
		}
	},
	methods: {
		changeModalStatus (status) {
			this.dialog = status
		}
	}
}
</script>