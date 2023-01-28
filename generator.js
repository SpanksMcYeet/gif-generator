(async () => {
  // Utilities
  const random = (max, round) => round ? Math.floor(Math.random() * max) : Math.random() < max
  const getRandom = array => array[Math.floor(Math.random() * array.length)]
  
  // Fetch the gifs
  const result = await fetch('https://lunahackley.gay/gif-gen/gifs.json')
  const GIFS = await result.json()
  // Wait for the user to click the button
  document.getElementById('gif-button').addEventListener('click', async () => {
      let chosenGif = ''
      let chosenDomain = ''
      const gifTypes = [
          [GIFS.TENOR.GIFS, GIFS.TENOR.DOMAIN],
          [GIFS.DISCORD.GIFS, GIFS.DISCORD.DOMAIN],
          [GIFS.CDNDISCORD.GIFS, GIFS.CDNDISCORD.DOMAIN],
          [GIFS.CTENOR.GIFS, GIFS.CTENOR.DOMAIN],
          [GIFS.OTHER.GIFS, GIFS.OTHER.DOMAIN],
      ]
      /***
      Choose a gif by assigning each gif type (tenor, discordapp, ctenor, etc.) a probability based on the amount of gifs they have (10%, 18%, 34%, etc.)
      Then select a random gif type to select a random gif from.
      ***/
      let getGif = () => {
          let getRatio = gifs => {
              let ratios = []
              let total = gifs.reduce((a, b) => a + b)
              for (let i of gifs)
                  ratios.push(i / total)
              return ratios
          }
          let typeRatio = getRatio(gifTypes.map(a => a[0].length))
          let chance = Math.random()
          let possibility = 0
          for (let i = 0; i < typeRatio.length; i++) {
              possibility += typeRatio[i]
              if (chance < possibility) {
                  chosenGif = getRandom(gifTypes[i][0])
                  chosenDomain = gifTypes[i][1]
                  break
              }
          }
          document.getElementById('gifClickable').textContent = `${chosenDomain}${chosenGif}`
          // Return it
          return `${chosenDomain}${chosenGif}`
      }
      // Now copy it to their clipboard
      let area = await document.getElementById('gifClickable')
      area.value = await getGif()
      await area.select()
      await document.execCommand("copy")
  })
})()
