<template>
	<div>
		<v-app-bar
			color="blue accent-4"
			dark
		>
			<v-app-bar-nav-icon @click="drawer = true" />
			<v-toolbar-title>EdBookstore</v-toolbar-title>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			absolute
			temporary
		>
			<v-list
				nav
				dense
			>
				<v-list-item-group
					v-model="group"
					active-class="blue--text text--accent-4"
				>
					<v-list-item to="/">
						<v-list-item-icon>
							<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Inicio</v-list-item-title>
					</v-list-item>
					<v-list-item to="/author">
						<v-list-item-icon>
							<v-icon>mdi-account</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Autores</v-list-item-title>
					</v-list-item>
					<v-list-item to="/book">
						<v-list-item-icon>
							<v-icon>mdi-bookshelf</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Libros</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>
<script>
export default {
	name: 'Navbar',
	data () {
		return {
			drawer: false,
			group: 0
		}
	}
}
</script>