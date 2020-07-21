## Importing Necessary Modules
import requests # to get image from the web
import shutil # to save it locally

def dlimage(name, img):
	## Set up the image URL and filename
	image_url = img.strip() #"https://cdn.pixabay.com/photo/2020/02/06/09/39/summer-4823612_960_720.jpg"
	filename = name.strip() + "." + image_url.split("/")[-1].split(".")[-1]

	# Open the url image, set stream to True, this will return the stream content.
	r = requests.get(image_url, stream = True)

	# Check if the image was retrieved successfully
	if r.status_code == 200:
	    # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
	    r.raw.decode_content = True
	    
	    # Open a local file with wb ( write binary ) permission.
	    with open(filename.strip(),'wb') as f:
	        shutil.copyfileobj(r.raw, f)
	        
	    print('Image sucessfully downloaded: ',filename)
	else:
	    print('Image Couldn\'t be retreived: ', filename)



with open("names.txt",'r') as f:
	lines = f.readlines()
	for line in lines:
		data = line.split(": ")
		if (len(data) > 1):
			dlimage(data[0], data[1])