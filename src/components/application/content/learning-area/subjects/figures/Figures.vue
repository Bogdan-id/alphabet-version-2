<template>
<div class="d-inline-flex flex-wrap justify-center">
	<FigureCard
		v-for="(value, index) in temporaryObj"
		:key="index"
		:value="value"
		:interval="index"
		>
	</FigureCard>
</div>
</template>

<script>
import FigureCard from './FigureCard.vue'

export default {
	props: [
		'temporaryObj',
		'windowSize'
	],
	components: {
		FigureCard,
	}
}
</script>