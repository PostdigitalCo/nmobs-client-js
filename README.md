NMOBS Client TAG
===================


# Setup


## Step 1

Add the [ad_passback.html](https://github.com/NMOBS/nmobs-client-js/blob/master/dist/ad_passback.html)  file to the root directory of your website. Should look like: http://www.example.com/ad_passback.html

## Step 2 : Ad unit

Add the following units to your website accordingly:
*Please remember, you must replace the [MOPUB ID] fields with the MPOUB ID's sent to you.*

### Standard Banner 320x50

```html
<div class="nmobs" data-adid="[MOPUB ID]" data-adsize="320x50" data-adtype="dynamic"></div>
```

### MRE 300x250

```html
<div class="nmobs" data-adid="[MOPUB ID]" data-adsize="300x250" data-adtype="dynamic"></div>
```

### Masthead 320x100

```html
<div class="nmobs" data-adid="[MOPUB ID]" data-adsize="320x100" data-adtype="dynamic"></div>
```

### Fullpage 320x480

```html
<div class="nmobs" data-adid="[MOPUB ID]" data-adtype="fullpage"></div>
```

### Sticky 320x50

```html
<div class="nmobs" data-adid="[MOPUB ID]" data-adtype="sticky"></div>
```

## Step 3 : Library

Add the following line just before closing the `<body>` tag on all your pages. **Make sure you only include it once on your pages.**

```html
<script src="//campaign.nmobs.com/nmobs.js" type="application/javascript"></script>
```

**Example**

```html
	    <div>Article</div>
	    <script src="//campaign.nmobs.com/nmobs.js" type="application/javascript"></script>
    </body>
```


## Step 4 : Programmatic

Add the following lines between `<head></head>` tags on your page to include the required libraries.

```html
    <script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script type="text/javascript" src="//static.criteo.net/js/ld/publishertag.js"></script>
```

### **Google Adx** *(Optional)*

**Parameter**  data-googleid
**Field**  google_ad_client / google_ad_slot
**Usable spaces** : 320x50, 320x100,300x250,336x280.Sticky

**Example**

```html
	<div class="nmobs" data-adid="[MOPUB ID]" data-adtype="sticky" data-googleid="ca-pub-123456789123456789/123456789"></div>
```

----------


### **TagOn** *(Optional)*

**Parameter**  data-tagonid
**Field**  PublisherId /InventoryId/AdunitId
**Usable spaces** : Fullpage

**Example**

```html
    <div class="nmobs" data-adid="[MOPUB ID]" data-adtype="sticky" data-tagonid="123456789/123456789/123456789"></div>
```

----------


### **Criteo** *(Optional)*

**Parametre**  data-criteoid
**Field**  ZoneId
**Usable spaces** : 320x50, 320x100,300x250,336x280.Sticky

**Example**

```html
    <div class="nmobs" data-adid="[MOPUB ID]" data-adtype="sticky" data-criteoid="1234567"></div>
```
