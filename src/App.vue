<template>
	<v-app>
		<v-content class="grey lighten-4">
			<router-view />
		</v-content>
	</v-app>
</template>

<script>
import { state, mutations } from '@/modules/auth/store'

export default {
	name: 'App',
	provide: {
		state,
		setToken: mutations.setToken,
		setUser: mutations.setUser
	},
	data: () => ({
		//
	}),
};
</script>
