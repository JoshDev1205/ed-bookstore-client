<template>
	<v-container
		fluid
		class="fill-height blue"
	>
		<v-row justify="center">
			<v-flex>
				<v-card
					max-width="400"
					raised
					class="mx-auto py-4 px-4"
				>
					<slot />
				</v-card>
			</v-flex>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: 'Main'
}
</script>