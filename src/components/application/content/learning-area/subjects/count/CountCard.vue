<template>
<v-container class="pa-0 ma-0">
	<v-row>
		<v-col class="d-inline-flex">
			<v-card class="d-inline-flex flex-wrap align-center">
				<v-menu 
					v-for="(item, index) in arrayItem"
					:key="`${index}-${value}`"
					close-delay="500"
					:close-on-content-click="false"
					offset-y top
					>
					<template #activator="{ on: menu }">
						<v-hover>
							<template #default="{ hover }">
								<v-card
									v-on="index === 0 ? { ...menu } : false"
									:elevation="
										index !== 0 && showIconInstead || item === '+' || item === '=' ? 0 
										: index === 0 && hover ? 8 : 2"
									:class="
										`ma-1
										${item === '+' ? ' pr-3 pl-3 headline' 
										: item === '=' ? 'pr-3 pl-3 headline white black--text' 
										: item === value && index === 0 ? 'success display-1 white--text pa-2 pl-4 pr-4'
										: showIconInstead ? 'pa-0'
										:'primary white--text pa-1 pl-4 pr-4 headline'}`" 
									>
									{{ item === 1 && index !== 0 && !showIconInstead ? 1 
										: index === 0 || item === '+' || item === '=' ? item 
										: '' }}
									<v-img
										class="align-start pa-0 ma-0"
										v-if="showIconInstead && item !== '+' && item !== '=' && index !== 0"
										:width="46"
										:height="46"
										:src="currentIcon"
										>
									</v-img>
								</v-card>
							</template>
						</v-hover>
					</template>
					<v-card elevation="7" v-if="!showIconInstead">
						<v-hover 
							v-for="(item, key) in images"
							:key="key">
							<template #default="{ hover }">
								<v-card 
									@click="currentIcon = item; showIconInstead = true"
									:elevation="hover ? 6 : 2"  
									class="headline d-inline-flex pa-3 pt-1 pb-1 ma-1">
									<v-img class="d-block" :width="42" :height="42" :src="item"></v-img>
								</v-card>
							</template>
						</v-hover>
					</v-card>
					<v-card elevation="7" v-if="showIconInstead">
						<v-hover>
							<template #default="{ hover }">
								<v-card 
									@click="showIconInstead = false" 
									:elevation="hover ? 6 : 2"  
									class="headline d-inline-flex pa-1 ma-1">
									<v-icon size="38" v-if="showIconInstead" v-text="'mdi-cancel'"></v-icon>
								</v-card>
							</template>
						</v-hover>
					</v-card>
				</v-menu>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>

<script>
export default {
	props: ['value', 'temporaryObj'],
	data: () => ({
		currentIcon: null,
		showIconInstead: false,
		arrayItem: null,
		images: null,
	}),
	methods: {
		async valueRow() {
			let arrayNumbers = []
			for(let i = 1; i <= this.value; i++){
				i !== this.value ? arrayNumbers.push(1, '+') : arrayNumbers.push(1)
			}
			arrayNumbers.unshift(this.value, '=')
			this.arrayItem = arrayNumbers
		},
		async getImgURL() {
			let temp = await this.temporaryObj.map(val => {
				return URL.createObjectURL(val.image) 
			})
			Promise.all(temp).then(val => {
				this.images = val
			}).catch(err => {
				console.log(err)
				this.$store.dispatch('navigationModule/set_error', err)
			})
		},
	},
	mounted() {
		this.valueRow()
		this.getImgURL()
		
	}
}
</script>
