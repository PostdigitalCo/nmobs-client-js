NMOBS Client TAG
===================


# Kurulum


## Adım 1

[Buradaki](https://github.com/NMOBS/nmobs-client-js/blob/master/dist/ad_passback.html) ad_passback.html dosyasını sitenin ana dizinine ekleyin.

## Adım 2 : Alanlar

Aşağıdaki alanları siteye uygun biçimde ekleyin.
*[MOPUB ID] alanlarını size gönderilen mopub id leri ile değiştirmelisiniz.*

**Standar Banner 320x50**

	<div class="nmobs" data-adid="[MOPUB ID]" data-adsize="320x50" data-adtype="dynamic"></div>

**MRE 300x250**

	 <div class="nmobs" data-adid="[MOPUB ID]" data-adsize="300x250" data-adtype="dynamic"></div>

**Masthead 320x100**

	<div class="nmobs" data-adid="[MOPUB ID]" data-adsize="320x100" data-adtype="dynamic"></div>

**Fullpage 320x480**

	<div class="nmobs" data-adid="[MOPUB ID]" data-adtype="fullpage"></div>

**Sticky 320x50**

	<div class="nmobs" data-adid="[MOPUB ID]" data-adtype="sticky"></div>

## Adım 3 : Kütüphane

Aşağıdaki satırı tüm sayfalarınızda **1 adet olacak şekilde** `<body>` tag'inin sonuna ekleyin.

    <script src="//campaign.nmobs.com/nmobs.js" type="application/javascript"></script>

**Örnek**

	    <div>Article</div>
	    <script src="//campaign.nmobs.com/nmobs.js" type="application/javascript"></script>
    </body>


## Adım 4 : Programatik

Aşağıdaki kütüphaneleri tüm sayalarınız da `<head></head>` tagleri arasına yerleştirin.

    <script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script type="text/javascript" src="//static.criteo.net/js/ld/publishertag.js"></script>

### **Google Adx** *(Opsiyonel)*

**Parametre**  data-googleid
**Giriş Biçimi**  google_ad_client /google_ad_slot
**Kullanılabilir Alanlar** : 320x50, 320x100,300x250,336x280.Sticky

**Örnek**

	<div class="nmobs" data-adid="[MOPUB ID]" data-adtype="sticky" data-googleid="ca-pub-123456789123456789/123456789"></div>


----------


### **TagOn** *(Opsiyonel)*

**Parametre**  data-tagonid
**Giriş Biçimi**  PublisherId /InventoryId/AdunitId
**Kullanılabilir Alanlar** : Fullpage

**Örnek**

    <div class="nmobs" data-adid="[MOPUB ID]" data-adtype="sticky" data-tagonid="123456789/123456789/123456789"></div>

----------


### **Criteo** *(Opsiyonel)*

**Parametre**  data-criteoid
**Giriş Biçimi**  ZoneId
**Kullanılabilir Alanlar** : 320x50, 320x100,300x250,336x280.Sticky

**Örnek**

    <div class="nmobs" data-adid="[MOPUB ID]" data-adtype="sticky" data-criteoid="1234567"></div>

