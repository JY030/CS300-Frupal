#!/usr/bin/python3
#!/usr/bin/python
#!/usr/bin/env python
#!/usr/local/bin/python

mapFile = open("map/map_file.txt")
storageLine=""
for mapLine in mapFile:
        storageLine = storageLine + "[" + mapLine.rstrip() + "]"
mapFile.closed
print("<script>")
print("localStorage.setItem('map','"+storageLine+"')");
print("</script>")

with open('map/map.html', 'w') as f:
	print("<script>localStorage.setItem('map','"+storageLine+"')</script>", file=f)
