<template>
	<v-card>
		<v-list>
			<v-list-item-group>
				<v-list-item 
					v-for="(item, i) in items.object"
					@click="$emit('listenReadMessage', i)"
					:class="`${item.wasRead ? 'white' : 'blue lighten-5'}`"
					:key="i"
					>
					<v-list-item-content>
						<v-list-item-title>
							{{ item.message }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ item.title }}
						</v-list-item-subtitle>
						<v-list-item-subtitle>
							{{ item.date }}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</v-card>
</template>

<script>
export default {
	props: ['items'],
	data: () => ({

	}),
	computed: {
		user() {
			return this.$store.state.navigationModule.user
		}
	},
	mounted() {
		console.log(this.user)
		console.log(this.items.object)
	}
}
</script>