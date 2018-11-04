#!/usr/bin/python3
#!/usr/bin/python
#!/usr/bin/env python
#!/usr/local/bin/python

mapFile = open("map/map_file.txt")

listOfContents = []
for mapLine in mapFile:
        listOfContents.append(mapLine.rstrip())
mapFile.closed

mapName = listOfContents[0]
listOfContents.remove(mapName)

mapSize = listOfContents[0]
listOfContents.remove(mapSize)
listOfContents.remove('#######')

heroPosition = listOfContents[0]
listOfContents.remove(heroPosition)

energy = listOfContents[0]
listOfContents.remove(energy)

money = listOfContents[0]
listOfContents.remove(money)

inventory = []
for i in listOfContents:
	if (i == '#######'):
			listOfContents.remove(i)
			break
	else:
		inventory.append(i)

newListOfContents = set(listOfContents).difference(set(inventory));

tiles = []
for i in newListOfContents:
	tiles.append([i])

print(mapName);
print(mapSize);
print(heroPosition);
print(energy);
print(money);
print(inventory);
print(tiles);

strInventory = str(inventory).replace('\'', '')
strTiles = str(tiles).replace('\'', '')

input("Press Enter to continue.")

with open('../Views/Index.html', 'r+') as f:
	ignore = f.readline()
	originalFile = f.read()
	f.seek(0)
	print("<script>localStorage.setItem('mapName', '" + mapName + "'); localStorage.setItem('mapSize', '" + mapSize + "'); localStorage.setItem('heroPosition', JSON.stringify('" + heroPosition + "')); localStorage.setItem('energy', '" + energy + "'); localStorage.setItem('money', '" + money + "'); localStorage.setItem('inventory', JSON.stringify('" + strInventory + "')); localStorage.setItem('tiles', JSON.stringify('" + strTiles + "')); </script>", file=f)
	f.write(originalFile)