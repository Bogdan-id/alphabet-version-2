<template>
<v-row :class="`justify-${toggleView} d-inline-flex flex-wrap`">
	<v-icon 
		large
		class="change-upper-case"
		@click="
			$store.state.navigationModule.upperCase 
				? $store.dispatch('navigationModule/set_upper_case', false) 
				: $store.dispatch('navigationModule/set_upper_case', true)"
		>
		{{
			$store.state.navigationModule.upperCase 
				? 'fas fa-calendar-minus' 
				: 'fas fa-calendar-plus'
		}}
	</v-icon>
	<AlphabetCard
		v-for="(value, index) in temporaryObj"
		:value="value"
		:key="index"
		@setCurrentCard="currentCard = $event"
		:windowSize="windowSize"
		:currentCard="currentCard"
	>
	</AlphabetCard>
</v-row>
</template>

<script>
import AlphabetCard from './AlphabetCard.vue'
export default {
	props: [
		'windowSize',
		'temporaryObj',
	],
	data: () => ({
		currentCard: null,
	}),
	computed: {
		/*eslint-disable */
		toggleView() {
			switch (this.$vuetify.breakpoint.name) {
			case 'xs': return 'center'
			case 'sm': return 'center'
			case 'md': return 'start'
			case 'lg': return 'start'
			case 'xl': return 'start'
			}
		},
		/*eslint-disable */
	},
	components: {
		AlphabetCard,
	},
}
</script>

<style scoped>
	.change-upper-case {
        position: absolute;
        top: 0px;
        right: 10px;
        z-index: 4;
    }
</style>
