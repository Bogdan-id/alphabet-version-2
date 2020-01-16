import { fetchBlob, progressUtils } from '../../../../../utils'

export const subjectsHandler = {
	fetchAlphabet: async(objectItems) => {
		console.log('fetchAlphabet()')
		progressUtils.startProgress(false, false)
		let length = Object.keys(objectItems).length
		let percentPerVal = 100 / length
		let finalObj = Object.keys(objectItems).map(async val => {
			let object = new Object()
			object['id'] = objectItems[val]['item']
			object['sound'] = await fetchBlob(objectItems[val]['sound'])
			let promiseNestObj = Object.keys(objectItems[val])
				.filter(f => objectItems[val][f].hasOwnProperty('image'))
				.map(async nestedVal => {
					let wordsObj = new Object()
					wordsObj['word'] = objectItems[val][nestedVal]['word']
					wordsObj['image'] = await fetchBlob(objectItems[val][nestedVal]['image'])
					wordsObj['detailSound'] = await fetchBlob(objectItems[val][nestedVal]['sound'])
					return wordsObj
				})
			object['wordsObj'] = await Promise.all(promiseNestObj).then(val => {
				return val
			})
			let progress = progressUtils.getProgress().currentProgress + percentPerVal
			progressUtils.setProgress(Math.ceil(progress))
			return object
		})
		return await Promise.all(finalObj).then(val => {return val})
	},
	
	fetchNumbers: async(objectItems) => {
		console.log('fetchNumbers()')
		objectItems.splice(0, 1)
		progressUtils.startProgress(false, false)
		let length = Object.keys(objectItems).length
		let percentPerVal = 100 / length
		const numItems = objectItems.map(
			// eslint-disable-next-line
			async (el, i, arr) => {
				//arr.length
				let sound = await fetch(el.sound, {method: 'GET'})
				let blob = await sound.blob()
				let progress = progressUtils.getProgress().currentProgress + percentPerVal
				progressUtils.setProgress(Math.ceil(progress))
				return {'id': parseInt(el.item),'sound': blob}
			}
		)
		let obj =  await Promise.all(numItems).then(val => {
			return val
		})
		return obj
	},
	
	fetchFigures: async(objectItems) => {
		console.log('fetchFigures()')
		progressUtils.startProgress(false, false)
		let length = Object.keys(objectItems).length
		let percentPerVal = 100 / length
		let figureItems = Object.keys(objectItems).map(async val => {
			let item = objectItems[val].item
			let sound = await fetch(objectItems[val].sound, {method: 'GET'})
			let blob = await sound.blob()
			let progress = progressUtils.getProgress().currentProgress + percentPerVal
			progressUtils.setProgress(Math.ceil(progress))
			return {'id': item, 'value': blob}
		})
		let obj =  await Promise.all(figureItems).then(val => {
			return val
		})
		return obj
	},
	
	fetchCount: async(objectItems) => {
		console.log('fetchCount()')
		progressUtils.startProgress(false, false)
		let length = Object.keys(objectItems).length
		let percentPerVal = 100 / length
		let items = Object.keys(objectItems).map(async val => {
			let obj = await fetch(objectItems[val], {method: 'GET'})
			let blob = await obj.blob()
			let progress = progressUtils.getProgress().currentProgress + percentPerVal
			progressUtils.setProgress(Math.ceil(progress))
			return {'id': val, 'image': blob}
		})
		let obj =  await Promise.all(items).then(val => {
			return val
		})
		return obj
	},
	
	fetchColors: async(objectItems) => {
		console.log('fetchColors()')
		progressUtils.startProgress(false, false)
		let length = Object.keys(objectItems).length
		let percentPerVal = 100 / length
		let item = Object.keys(objectItems).map(async val => {
			let color = objectItems[val]['item']
			let getSound = await fetch(objectItems[val]['sound'], {method: 'GET'})
			let soundBlob = await getSound.blob()
			let progress = progressUtils.getProgress().currentProgress + percentPerVal
			progressUtils.setProgress(Math.ceil(progress))
			return {'id': color,'sound': soundBlob}
		})
		let obj =  await Promise.all(item).then(val => {
			return val
		})
		return obj
	}
}
