/**
 * Created by enesdabanlioglu on 21.10.2016.
 */
var DisplayUtilityModule = (function () {

    //Alert for debug
    var _Logger = {
        Info : function(InfoText){
            console.log(InfoText);
        },
        Error : function(Title, ErrorObject){
            console.log(Title)
            console.log(ErrorObject);
        }
    };

    var _Guid = function() {
        function i() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return i() + i() + "" + i() + i() + i() + i() + i() + i()
    };

    var _GetAttribute = function(Element, Key){
        return Element.getAttribute(Key) || null;
    };

    var _GetAdSize = function(AdElement) {

        if(_GetAttribute(AdElement, "data-adtype") === "sticky") return { width : 320, height: 50 };
        else if(_GetAttribute(AdElement, "data-adtype") === "fullpage") return { width : 320, height: 480 };

        var AdSizeText = _GetAttribute(AdElement, "data-adsize") || null;
        if (AdSizeText)
        {
            var AdSizeParts = AdSizeText.split("x");
            return { width : AdSizeParts[0], height: AdSizeParts[1] };
        } else
            return null;
    };

    var _IsObject = function (variable, nullCheck) {
        if (nullCheck) {
            if (typeof variable === "object" && variable !== null) return true;
            else return false;
        } else {
            if (typeof variable === "object") return true;
            else return false;
        }
    };

    var _IsString = function (variable, nullCheck) {
        if (nullCheck) {
            if (typeof variable === "string" && variable !== "" && variable !== null && typeof variable !== "undefined") return true;
            else return false;
        } else {
            if (typeof variable === "string") {
                return true;
            }
            else return false;
        }
    };

    var _IsFunction = function (variable) {
        if (typeof variable === "function") return true;
        else return false;
    };

    var _IsArray = function (variable) {
        if (Array.isArray(variable)) {
            if (variable.length >= 1) return true;
            else return false;
        } else return false;
    };

    var _CheckEmpty = function (variable) {

        if (typeof variable === "undefined" || variable === null || variable == NaN) return true;
        else return false;

    };

    var _JsonpCall = function (Url, SuccessCallback, ErrorCallback) {
        try {
            var RequestID = "R" + parseInt(Math.random() * 10000009);
            var ResponseObject = {};
            var RequestObject = document.createElement("script");

            RequestObject.type = "text/javascript";
            RequestObject.src = Url + "&callback=" + RequestID;
            document.body.appendChild(RequestObject);

            window[RequestID] = function (Response) {

                if (_IsFunction(SuccessCallback)) {
                    if (_IsObject(Response)) {

                        if(Response["ad"] === "<span></span>"){ if (_IsFunction(ErrorCallback)) { ErrorCallback("No Ad For This Id", Response["ufid"]); } }
                        else SuccessCallback(Response);

                    } else {
                        try {
                            ResponseObject = JSON.parse(Response);
                            if (_IsObject(ResponseObject)) {

                                if(typeof ResponseObject["ad"] === "<span></span>"){ if (_IsFunction(ErrorCallback)) { ErrorCallback("No Ad For This Id", ResponseObject["ufid"]); } }
                                else SuccessCallback(ResponseObject);
                            }
                        } catch (ex) {
                            _Logger.Error("_JsonpCall", ex);
                            if (_IsFunction(ErrorCallback)) ErrorCallback("Network Error");
                        }
                    }
                } else { }
            };

        } catch (ex) {
            _Logger.Error("_JsonpCall", ex);
            if (_IsFunction(ErrorCallback)) ErrorCallback("Network Error");
        }
    };

    var _GetIfAvailable = function(SourceObject, PropertyTree){

        var GetProperty = function(ChildObject, Property){

            return ChildObject[Property] || null;

        };

        for(var PropertyIndex = 0; PropertyIndex < PropertyTree.length; PropertyIndex++) {

            var Property = GetProperty(SourceObject, PropertyTree[PropertyIndex]);

            if(Property === null) return null;
            else SourceObject = Property;

            if(PropertyIndex === PropertyTree.length - 1) return Property;

        };
    };

    var _Element = (function(AdElement){

        return {

            SetStyle : function(Key, Value){

                AdElement.style[Key] = Value;

            },
            Html : function(Htmltext){

                AdElement.innerHTML = Htmltext;
            },
            Append : function(Element){

                AdElement.appendChild(Element);
            }

        };

    });

    var _ClearDomainString = window.location.hostname.replace(/www\./g, "").replace(/m\./g, "").replace(/\./g, "_");

    return {
        Logger : _Logger,
        Guid : _Guid,
        GetAttribute : _GetAttribute,
        GetAdSize : _GetAdSize,
        JsonpCall : _JsonpCall,
        GetIfAvailable : _GetIfAvailable,
        ClearDomainString : _ClearDomainString,
        Element : _Element
    };

})();



var DisplayConfigurationModule = (function (UtilityModule) {

    //Site Configuration
    var _SiteConfig = {
        //UZMAN TV
        uzman_tv : {
            programmatic : {
                _300x250 : {
                    ligatusId : "78561",
                    criteoId : "352383",
                    googleId : {
                        PartnerId : "ca-pub-4939207172719226",
                        SlotId : "9236540058"
                    }
                },
                _320x50 : {
                    ligatusId : "78559",
                    criteoId : "352437",
                    googleId : {
                        PartnerId : "ca-pub-4939207172719226",
                        SlotId : "9236540058"
                    }
                }
            },
            rtb_rank : [],
            resize : {
                _320x50 : { width: 320, height: 100 },
                _300x250 : { width: 336, height: 280 },
                _320x142 : { width: 320, height: 100 },
                _Sticky : { width: 320, height: 50 }
            }
        },
        //ZAYTUNG
        zaytung_com : {
            programmatic : {
                _300x250 : {

                },
                _320x50 : {
                    ligatusId : "78579",
                    criteoId : "326379",
                    googleId : {
                        PartnerId : "ca-pub-4939207172719226",
                        SlotId : "7759832178"
                    }
                }
            },
            rtb_rank : [],
            resize : {
                _320x50 : { width: 320, height: 100 },
                _300x250 : { width: 336, height: 280 },
                _320x142 : { width: 320, height: 100 },
                _Sticky : { width: 320, height: 50 }
            }
        },
        //UCAKARA
        ucakara_com : {
            programmatic : {
                _300x250 : {

                },
                _320x50 : {
                    ligatusId : "",
                    criteoId : "353982",
                    googleId : "",
                    dfpId : ""
                }
            },
            rtb_rank : [],
            resize : {
                _320x50 : { width: 320, height: 100 },
                _300x250 : { width: 336, height: 280 },
                _320x142 : { width: 320, height: 100 },
                _Sticky : { width: 320, height: 50 },
            }
        },
        //INTERNETHABER
        internethaber_com : {
            rtb_rank : ["adx", "inrool", "admatic"],
            programmatic : {
                _320x50 : {
                    size : { width: 320, height: 100 }
                },
                _300x250 : {
                    size : { width: 336, height: 280 }
                },
                _320x142 : {
                    size: { width: 320, height: 100 }
                },
                _320x100 : {
                    size: { width: 320, height: 100 }
                },
                _Sticky : {
                    size: { width: 320, height: 50 }
                },
                _Fullpage : {
                    size: { width: 320, height: 480 }
                }
            }
        },
        //ELMAELMA
        elmaelma_com : {
            rtb_rank : ["adx", "inrool", "admatic"],
            programmatic : {
                _320x50 : {
                    size : { width: 320, height: 100 }
                },
                _300x250 : {
                    size : { width: 336, height: 280 }
                },
                _320x142 : {
                    size: { width: 320, height: 100 }
                },
                _320x100 : {
                    size: { width: 320, height: 100 }
                },
                _Sticky : {
                    size: { width: 320, height: 50 }
                },
                _Fullpage : {
                    size: { width: 320, height: 480 }
                }
            }
        },
        //INTERNETSPOR
        internetspor_com : {
            rtb_rank : ["adx", "inrool", "admatic"],
            programmatic : {
                _320x50 : {
                    size : { width: 320, height: 100 }
                },
                _300x250 : {
                    size : { width: 336, height: 280 }
                },
                _320x142 : {
                    size: { width: 320, height: 100 }
                },
                _320x100 : {
                    size: { width: 320, height: 100 }
                },
                _Sticky : {
                    size: { width: 320, height: 50 }
                },
                _Fullpage : {
                    size: { width: 320, height: 480 }
                }
            }
        },
        //MEMURHABER
        memurhaber_com : {
            rtb_rank : ["adx", "inrool", "admatic"],
            programmatic : {
                _320x50 : {
                    size : { width: 320, height: 100 }
                },
                _300x250 : {
                    size : { width: 336, height: 280 }
                },
                _320x142 : {
                    size: { width: 320, height: 100 }
                },
                _320x100 : {
                    size: { width: 320, height: 100 }
                },
                _Sticky : {
                    size: { width: 320, height: 50 }
                },
                _Fullpage : {
                    size: { width: 320, height: 480 }
                }
            }
        },
        localhost : {
            programmatic : {
                _300x250 : {
                    ligatusId : "89193",
                    googleId : {
                        PartnerId : "ca-pub-4939207172719226",
                        SlotId : "7759832178"
                    },
                    criteoId : "",
                    dfpId : "",
                    size :  { width: 336, height: 280 }
                },
                _320x50 : {
                    ligatusId : "",
                    googleId : {
                        PartnerId : "ca-pub-9612539386533291",
                        SlotId : "3606100010"
                    },
                    size:  { width: 320, height: 100 }
                },
                _320x100 : {
                    ligatusId : "89195",
                    googleId : {
                        PartnerId : "ca-pub-4939207172719226",
                        SlotId : "7759832178"
                    },
                    size:  { width: 320, height: 100 }
                },
                _320x142 : {
                    ligatusId : "89195",
                    criteoId : "",
                    googleId : {
                        PartnerId : "ca-pub-4939207172719226",
                        SlotId : "9236540058"
                    },
                    size:  { width: 320, height: 100 }
                },
                _Fullpage : {
                    admaticId : { PublisherId: "adm-pub-159427406117", NetworkId: "132121923976", SlotId: "206" },
                    tagonId : { AccountId : "57fb51268a672", InventoryId : "57c6be3c4b674", AdunitId: "57c6be3c4d26e" },
                    size:  { width: 320, height: 480 }
                },
                _Sticky : {
                    inroolId : ["http://c.inrool.com/js/c.js?m=1", "http://c.inrool.com/js/trigger.js"],
                    googleId : {
                        PartnerId : "ca-pub-9612539386533291",
                        SlotId : "3606100010"
                    },
                    size:  { width: 320, height: 50 }
                }
            },
            rtb_rank : ["criteo", "adx", "admatic", "inrool", "ligatus"],
        }
    };

    var _GetConfig = function(){

        if(typeof _SiteConfig[UtilityModule.ClearDomainString] !== "undefined") return _SiteConfig[UtilityModule.ClearDomainString];
        else { return null; }
    };

    var _GetRTBRank = function(){

        return _GetConfig()["rtb_rank"] || [];

    };

    var _GetProgrammaticSourceForSize = function(AdObject, SourceName, SourceValue){

        var Source = null;

        if(AdObject.AdType === "sticky"){

            Source = {
                Id : SourceValue || UtilityModule.GetIfAvailable(_GetConfig(), ["programmatic", "_Sticky", SourceName]),
                Size : UtilityModule.GetIfAvailable(_GetConfig(), ["programmatic", "_Sticky", "size"])
            };
        }
        else if(AdObject.AdType === "fullpage"){

            Source = {
                Id : SourceValue || UtilityModule.GetIfAvailable(_GetConfig(), ["programmatic", "_Fullpage", SourceName]),
                Size : UtilityModule.GetIfAvailable(_GetConfig(), ["programmatic", "_Fullpage", "size"])
            };
        }
        else {

            Source = {
                Id : SourceValue || UtilityModule.GetIfAvailable(_GetConfig(), ["programmatic", "_" + AdObject.AdSize.width + "x" + AdObject.AdSize.height, SourceName]),
                Size : UtilityModule.GetIfAvailable(_GetConfig(), ["programmatic", "_" + AdObject.AdSize.width + "x" + AdObject.AdSize.height, "size"])
            };
        }

        return Source || null;
    };

    return {
        GetConfig : _GetConfig,
        GetProgrammaticSourceForSize : _GetProgrammaticSourceForSize,
        GetRTBRank : _GetRTBRank
    };

})(DisplayUtilityModule);
/**
 * Created by enesdabanlioglu on 21.10.2016.
 */

var DisplayAdunitModule = (function (UtilityModule, ConfigModule) {

    var _AdunitTable = _AdunitTable || {};

    //function
    var _GetGoogleId = function(GoogleIdString){

        var GoogleIdParts = GoogleIdString ? GoogleIdString.split("/") : [];

        if(GoogleIdParts.length >= 1) return { PartnerId: GoogleIdParts[0], SlotId: GoogleIdParts[1] };
        else return null;
    };

    var _GetAdmaticId = function(AdmaticIdString){

        var AdmaticIdParts = AdmaticIdString ? AdmaticIdString.split("/") : [];

        if(AdmaticIdParts.length >= 1) return { PublisherId: AdmaticIdParts[0], NetworkId: AdmaticIdParts[1], SlotId: AdmaticIdParts[2] };
        else return null;
    };

    var _GetTagonId = function(TagonIdString){

        var TagonIdParts = TagonIdString ? TagonIdString.split("/") : [];

        if(TagonIdParts.length >= 1) return { AccountId: TagonIdParts[0], InventoryId: TagonIdParts[1], AdunitId: TagonIdParts[2] };
        else return null;
    };

    var _GetInroolId = function(InroolIdString){

        var InroolIdParts = InroolIdString ? InroolIdString.split("/") : [];

        if(InroolIdParts.length >= 1) return InroolIdParts;
        else return null;
    };

    var _UpdateElementId = function(AdElement){

        var ElementId = AdElement.id;

        if(!ElementId) AdElement.id = UtilityModule.Guid();

        return AdElement.id;
    }

    var _ElementToAdunit = function(AdElement){

        var AdObject = {};

        AdObject.AdElement = AdElement;

        AdObject.AdunitId = _UpdateElementId(AdElement);

        AdObject.AdType = UtilityModule.GetAttribute(AdElement, "data-adtype");

        AdObject.AdId = UtilityModule.GetAttribute(AdElement, "data-adid");

        AdObject.AdSize = UtilityModule.GetAdSize(AdElement);

        AdObject.AdElement.setAttribute("data-adstate" , "ready");

        AdObject.Programmatic = {

            AdX : ConfigModule.GetProgrammaticSourceForSize(AdObject, "googleId", _GetGoogleId(UtilityModule.GetAttribute(AdElement, "data-googleid"))) ,
            Ligatus : ConfigModule.GetProgrammaticSourceForSize(AdObject, "ligatusId", UtilityModule.GetAttribute(AdElement, "data-ligatusid")),
            Criteo :  ConfigModule.GetProgrammaticSourceForSize(AdObject, "criteoId", UtilityModule.GetAttribute(AdElement, "data-criteoid")),
            Tagon :  ConfigModule.GetProgrammaticSourceForSize(AdObject, "tagonId", _GetTagonId(UtilityModule.GetAttribute(AdElement, "data-tagonid"))),
            AdMatic :  ConfigModule.GetProgrammaticSourceForSize(AdObject, "admaticId", _GetAdmaticId(UtilityModule.GetAttribute(AdElement, "data-admaticid"))),
            InRool :  ConfigModule.GetProgrammaticSourceForSize(AdObject, "inroolId", _GetInroolId(UtilityModule.GetAttribute(AdElement, "data-inroolid")))

        };

        //Callback
        AdObject.Callback = { Success : function(){}, Fail : function(){} };

        var SuccessCallback = UtilityModule.GetAttribute(AdElement, "data-success");
        if(typeof window[SuccessCallback] !== "undefined") AdObject.Callback.Success = window[SuccessCallback];

        var FailCallback = UtilityModule.GetAttribute(AdElement, "data-fail");
        if(typeof window[FailCallback] !== "undefined") AdObject.Callback.Fail = window[FailCallback];

        _Adunits.Set(AdObject);

        return AdObject;

    };

    var _Adunits = {

        Get : function(AdunitId){
            return _AdunitTable[AdunitId] || null;
        },
        Set : function(AdObject){
            _AdunitTable[AdObject.AdunitId] = AdObject;
        }
    };

    return {
        ElementToAdunit : _ElementToAdunit,
        Adunits : _Adunits
    };

})(DisplayUtilityModule, DisplayConfigurationModule);





//<div class="nmobs banner mb-10"
// data-adtype="dynamic"
// data-adid="218e167560794947a0fea33cd4c445f6"
// data-googleid="" data-adsize="320x142"
// id="25aa1b7be2f8ead6cd9644bfc022e20c"
// data-status="rendered"
// style="display: none; margin: 0px; padding: 0px;"></div>
/**
 * Created by enesdabanlioglu on 25.10.2016.
 */

var DisplayUserModule = (function (UtilityModule) {

    var _Init = function(SuccessCallback){

        NMOBS_USER_URL = '//user.tagon.co?v=1';

        if(sessionStorage.getItem("tg_str") !== null){ _SetValue(JSON.parse(sessionStorage.getItem("tg_str")), SuccessCallback); }
        else {

            UtilityModule.JsonpCall(NMOBS_USER_URL, function(UserData) {

                sessionStorage.setItem("tg_str", JSON.stringify(UserData));

                _SetValue(UserData, SuccessCallback);

            });
        }

    };

    var _User = {
        ID : "undefined",
        Country: "undefined",
        City: "undefined",
        Platform: "undefined",
        Browser: {
            Version: "undefined",
            Name: "undefined"
        },
        OS: {
            Version: "undefined",
            Name: "undefined"
        },
        Language: "undefined",
        Manufacturer: "undefined",
        Model: "undefined",
        Carrier: "undefined",
        IsRobot: "undefined",
        Connection: "undefined"
    };
    
    var _SetValue = function(UserData, SuccessCallback){

        function CheckNullorEmpty(Key) { if(Key !== "" && typeof Key !== "undefined" && Key !== null){ return true; } else { return false; } }
        function Uppercase(text) { return text.toLocaleUpperCase(); }

        if(CheckNullorEmpty(UserData.uid)) { _User.ID = Uppercase(UserData.uid); }
        if(CheckNullorEmpty(UserData.country)) { _User.Country = Uppercase(UserData.country); }
        if(CheckNullorEmpty(UserData.city)) { _User.City = Uppercase(UserData.city); }
        if(CheckNullorEmpty(UserData.platform)) {
            if(UserData.platform.toLowerCase().indexOf("mobile") >= 0){ _User.Platform = "MOBILE"; }
            else { _User.Platform = "DESKTOP"; }
        }
        if(CheckNullorEmpty(UserData.browser.name)) { _User.Browser.Name = Uppercase(UserData.browser.name); }
        if(CheckNullorEmpty(UserData.browser.version)) { _User.Browser.Version = Uppercase(UserData.browser.version); }
        if(CheckNullorEmpty(UserData.os.name)) { _User.OS.Name = Uppercase(UserData.os.name); }
        if(CheckNullorEmpty(UserData.os.version)) { _User.OS.Version = Uppercase(UserData.os.version); }
        if(CheckNullorEmpty(UserData.language)) { _User.Language = Uppercase(UserData.language); }
        if(CheckNullorEmpty(UserData.manufacturer)) { _User.Manufacturer = Uppercase(UserData.manufacturer); }
        if(CheckNullorEmpty(UserData.model)) { _User.Model = Uppercase(UserData.model); }
        if(CheckNullorEmpty(UserData.isp)) { _User.Carrier = Uppercase(UserData.isp); }
        if(CheckNullorEmpty(UserData.isRobot)) { _User.IsRobot = UserData.isRobot; }
        if(CheckNullorEmpty(UserData.connection)) { _User.Connection = Uppercase(UserData.connection); }

        SuccessCallback();
    };

    return {
        Init : _Init,
        SetValue : _SetValue,
        User : _User
    }

})(DisplayUtilityModule);
/**
 * Created by enesdabanlioglu on 24.10.2016.
 */
var DisplayViewModule = (function (AdUnitModule, MopubModule) {

    var _Fullpage = function(AdResponse){

        var AdObject = AdUnitModule.Adunits.Get(AdResponse.ufid); console.log(AdObject,AdResponse);

        var fullpageContainer = document.createElement("DIV");
        fullpageContainer.style.textAlign = "center";
        document.getElementById(AdResponse.ufid).appendChild(fullpageContainer);

        if(window.location.host == "zaytung.com" || window.location.host == "www.zaytung.com") fullpageContainer.style.width = "320px";
        else fullpageContainer.style.width = "100%";

        fullpageContainer.style.display = "none";
        fullpageContainer.style.position = "fixed";
        fullpageContainer.style.height = "100%";
        fullpageContainer.style.top = "0px";
        fullpageContainer.style.left = "0px";
        fullpageContainer.style.right = "0px";
        fullpageContainer.style.bottom = "0px";
        fullpageContainer.style.textAlign = "center";
        fullpageContainer.style.backgroundColor = "#000";
        fullpageContainer.style.zIndex = "2147483647";
        fullpageContainer.style.paddingTop = "45px";
        fullpageContainer.innerHTML = '<div id="nmobs_fullpage_loader" class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>'

        ///// Ad Frame

        var adFrame = document.createElement("iframe");
        adFrame.width = 320;
        adFrame.height = 480;
        //adFrame.style.marginTop = "35px";
        adFrame.frameBorder = 0;
        adFrame.style.display = "none";
        adFrame.onload = function() { console.log("adFrame loaded");
            document.getElementById("nmobs_fullpage_loader").style.display = "none";
            adFrame.style.display = "inline-block";
        };
        var InitScale = (window.top.innerWidth / 320) < ((window.top.innerHeight - 45) / 480) ? window.top.innerWidth / 320 : ((window.top.innerHeight-45) / 480);
        adFrame.style.transform = "scale("+ InitScale +")";
        adFrame.style.transformOrigin = "top";
        adFrame.style.width = "320px";
        adFrame.style.minWidth = "320px";

        fullpageContainer.appendChild(adFrame);

        adFrame.src = "about:self";

        adDocument = adFrame.contentWindow.document;
        adDocument.open("text/html", "replace");

        if(AdResponse.clickUrl) adDocument.write('<html><head><style>body { margin:0px; padding:0px; }</style></head><body onload="inDapIF=true; inFIF=true"><script>inDapIF=true; inFIF=true;</script><div id="' +
            AdResponse.ufid + '">' + adUnit.ad + '<script> for (var a = document.getElementsByTagName("a"), b = 0; b < a.length; b++) { var c = a[b]; if("#" != c.href) c.href = "' +
            AdResponse.clickUrl+ '" + "&r=" + encodeURIComponent(c.href); c.target="_top"; c.onclick = function(){ window.open(c.href); }</script></div></body></html>');
        else adDocument.write('<html><head><style>body { margin:0px; padding:0px; }</style></head><body onload="inDapIF=true; inFIF=true"><script>inDapIF=true; inFIF=true;</script><div id="' +
            AdResponse.ufid + '">' + AdResponse.ad + '</div></body></html>');

        adDocument.close();

        var controllBar = document.createElement("DIV");
        controllBar.style.height = "45px";

        if(window.location.host == "zaytung.com" || window.location.host == "www.zaytung.com") controllBar.style.width = "320px";
        else controllBar.style.width = "100%";

        controllBar.style.position = "fixed";
        controllBar.style.top = "0px";
        controllBar.style.left = "0px";
        controllBar.style.right = "0px";
        controllBar.style.backgroundColor = "#000";
        controllBar.style.opacity = "0.65"

        var ctaButton = document.createElement("DIV");
        ctaButton.style.float 		= "left";
        ctaButton.style.margin 		= "3px";
        ctaButton.style.color 		= "white";
        ctaButton.style.padding 	= "9px";
        ctaButton.style.fontSize    = "16px";
        ctaButton.innerHTML = "Detaylı bilgi için tıklayın";

        controllBar.appendChild(ctaButton);

        ///// Close Button

        var closeButton = document.createElement('canvas');

        closeButton.style.position   = "absolute";
        closeButton.style.width      = "20px";
        closeButton.style.height     = "20px";
        closeButton.style.top        = "13px";
        closeButton.style.right      = "13px";
        closeButton.width 			 = 20;
        closeButton.height 			 = 20;
        closeButton.style.zIndex 	 = "99999999";
        closeButton.style.display 	 = "none";

        setTimeout(function(){ closeButton.style.display = "block"; }, 3500);

        var ctx = closeButton.getContext('2d');
        ctx.fillStyle="#000";
        ctx.fill();
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(20, 20);
        ctx.moveTo(0, 20);
        ctx.lineTo(20, 0);
        ctx.stroke();

        closeButton.addEventListener("click", function(){ document.getElementById(AdResponse.ufid).style.display = "none"; });

        controllBar.appendChild(closeButton);
        fullpageContainer.appendChild(controllBar);

        fullpageContainer.style.display = "block";
    };

    var _Sticky = function(AdResponse, Source){

        ///// Close Button

        var closeButton = document.createElement('canvas');

        closeButton.style.position   = "absolute";
        closeButton.style.width      = "25px";
        closeButton.style.height     = "25px";
        closeButton.style.top        = "-13px";
        closeButton.style.left      	= "1px";
        closeButton.width 			= 25;
        closeButton.height 			= 25;
        closeButton.style.zIndex 	= "99999999";

        var ctx = closeButton.getContext('2d');
        ctx.fillStyle="#000";
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(6.5, 6.5);
        ctx.lineTo(16, 16);
        ctx.moveTo(6.5, 16);
        ctx.lineTo(16, 6.5);
        ctx.moveTo(21, 15.5);
        ctx.arc(11.5,11.5,10,0,2 * Math.PI);
        ctx.fillStyle = '#FFF';
        ctx.fill();
        ctx.stroke();

        closeButton.addEventListener("click", function(){ document.getElementById(AdResponse.ufid).style.display = "none"; })

        var stickyBannerContainer = document.getElementById(AdResponse.ufid);
        stickyBannerContainer.style.position = 'fixed';
        stickyBannerContainer.style.bottom = '0px';
        stickyBannerContainer.style.left = '0px';
        stickyBannerContainer.style.right = '0px';
        stickyBannerContainer.style.textAlign = 'center';
        stickyBannerContainer.style.width = '100%';
        stickyBannerContainer.style.height = '50px';
        stickyBannerContainer.style.zIndex = "99999998";
        stickyBannerContainer.style.backgroundColor = '#FFF';
        stickyBannerContainer.style.borderTop = '2px solid #000';
        stickyBannerContainer.innerHTML = "";
        stickyBannerContainer.appendChild(closeButton);

        ///// Ad Frame

        if(Source === "google")
        {
            var adFrame = document.createElement("DIV");
            adFrame.style.width = "320px";
            adFrame.style.height = "50px";
            adFrame.style.backgroundColor = "#FFF";
            adFrame.style.marginLeft = "auto";
            adFrame.style.marginRight = "auto";
            adFrame.innerHTML = AdResponse.ad;
            stickyBannerContainer.appendChild(adFrame);
        }
        else
        {
            var adFrame = document.createElement("iframe");
            adFrame.width = 320;
            adFrame.height = 50;
            adFrame.frameBorder = 0;

            if(AdResponse.clickUrl) adFrame.srcdoc = '<head><style>body { margin:0px; padding:0px; background-color: #FFF }</style></head><body><div id="' + AdResponse.ufid + '" style="width: 320px; height:50px; overflow:hidden;">' + AdResponse.ad + '</div><script> for (var a = document.getElementsByTagName("a"), b = 0; b < a.length; b++) { var c = a[b]; if("#" != c.href) c.href = "' + AdResponse.clickUrl+ '" + "&r=" + encodeURIComponent(c.href); c.target="_top"; c.onclick = function(){ window.open(c.href); }; }</script></body>';
            else adFrame.srcdoc = '<head><style>body { margin:0px; padding:0px; background-color: #FFF }</style></head><body><div id="' + AdResponse.ufid + '">' + AdResponse.ad + '</div></body>';

            adFrame.allowTransparency = "true";
            adFrame.frameBorder = "0";
            stickyBannerContainer.appendChild(adFrame);
        }
    };

    var _Dynamic = function (AdResponse, Source) {

        var dynamicContainer = document.getElementById(AdResponse.ufid);

        var AdObject = AdUnitModule.Adunits.Get(AdResponse.ufid);

        if(dynamicContainer !== null)
        {
            dynamicContainer.style.zIndex = '1';
            dynamicContainer.style.width = AdObject.AdSize.width + 'px';
            dynamicContainer.style.height = AdObject.AdSize.height + 'px';
            dynamicContainer.style.backgroundColor = '#FFF';
            dynamicContainer.innerHTML = "";

            ///// Ad Frame

            var adFrame = document.createElement("IFRAME");
            adFrame.width = AdObject.AdSize.width;
            adFrame.height = AdObject.AdSize.height;
            adFrame.frameBorder = 0;

            if(AdResponse.clickUrl && AdResponse.ad !== "[[IFRAME]]")
                adFrame.srcdoc = '<head><style>body { margin:0px; padding:0px; background-color: #FFF }</style></head><body><div id="' + AdResponse.ufid + '" style="width:'+AdObject.AdSize.width+'px; height:'+AdObject.AdSize.height+'px; overflow:hidden;">' + AdResponse.ad + '</div><script> for (var a = document.getElementsByTagName("a"), b = 0; b < a.length; b++) { var c = a[b]; if("#" != c.href) c.href = "' + AdResponse.clickUrl+ '" + "&r=" + encodeURIComponent(c.href); c.target="_parent"; }</script></body>';
            else if(AdResponse.ad !== "[[IFRAME]]")
                adFrame.srcdoc = '<head><style>body { margin:0px; padding:0px; background-color: #FFF }</style></head><body><div id="' + AdResponse.ufid + '" style="width:'+AdObject.AdSize.width+'px; height:'+AdObject.AdSize.height+'px; overflow:hidden;">' + AdResponse.ad + '</div></body>';

            adFrame.allowTransparency = "true";
            adFrame.frameBorder = "0";
            dynamicContainer.appendChild(adFrame);
        }
    };

    var _Show = function(AdResponse, Source){

        var AdObject = AdUnitModule.Adunits.Get(AdResponse.ufid);

        if(AdObject.AdType === "fullpage") _Fullpage(AdResponse, Source);
        else if(AdObject.AdType === "sticky") _Sticky(AdResponse, Source);
        else if(AdObject.AdType === "dynamic") _Dynamic(AdResponse, Source);
    };

    return {
        Show : _Show
    }

})(DisplayAdunitModule, DisplayMopubModule);

/**
 * Created by enesdabanlioglu on 24.10.2016.
 */
var ProgrammaticAdmaticModule = (function (AdunitModule, UtilityModule) {

    var _Init = function(AdunitId){

        if(AdunitId){

            var AdObject = AdunitModule.Adunits.Get(AdunitId);

            if(AdObject.Programmatic.AdMatic.Id){

                var AdSource = AdObject.Programmatic.AdMatic.Id;

                var AdSize = AdObject.Programmatic.AdMatic.Size;

                var AdElement = UtilityModule.Element(AdObject.AdElement);

                AdElement.Html("");
                AdElement.SetStyle("display", "none");

                var admaticIns = document.createElement('ins');
                admaticIns.setAttribute('data-publisher', AdSource.PublisherId);
                admaticIns.setAttribute('data-ad-type',"interstitial");
                admaticIns.setAttribute('class',"adm-ads-area");
                admaticIns.setAttribute('data-ad-network', AdSource.NetworkId);
                admaticIns.setAttribute('data-ad-sid', AdSource.SlotId);
                admaticIns.setAttribute('data-ad-width', AdSize.width);
                admaticIns.setAttribute('data-ad-height', AdSize.height);

                var admaticScript = document.createElement("script");
                admaticScript.type = "text/javascript";
                admaticScript.src = "http://cdn2.admatic.com.tr/showad/showad.js";
                document.body.appendChild(admaticIns);
                document.body.appendChild(admaticScript);

            } else {
                window.top.ad_passback(AdunitId);
            }
        }
    };

    return {
        Init : _Init
    }

})(DisplayAdunitModule, DisplayUtilityModule);
var ProgrammaticAdxModule = (function (AdunitModule, ConfigModule, UtilityModule, ViewModule) {

    var _Init = function(AdunitId){

        if(AdunitId){

            var AdObject = AdunitModule.Adunits.Get(AdunitId);

            if(AdObject.Programmatic.AdX.Id)
            {
                var AdSource = AdObject.Programmatic.AdX.Id;

                var AdSize = AdObject.Programmatic.AdX.Size;

                var AdElement = UtilityModule.Element(AdObject.AdElement);

                var ScriptString = "<ins class=\"adsbygoogle\" style=\"display:inline-block;width:"
                    + AdSize.width + "px;height:"
                    + AdSize.height + "px\" data-ad-client=\""
                    + AdSource.PartnerId + "\" data-ad-slot=\""
                    + AdSource.SlotId + "\"></ins>";

                if(AdObject.AdType === "sticky") {

                    ViewModule.Show({ ufid: AdObject.AdunitId, ad: ScriptString }, "google");

                } else {
                    AdElement.SetStyle("width", AdSize.width + "px");
                    AdElement.SetStyle("height", AdSize.height + "px");
                    AdElement.Html(ScriptString);
                }

                (adsbygoogle = window.adsbygoogle || []).push({
                    params: {
                        google_alternate_ad_url: window.location.origin + "/ad_passback.html?placeid=" + AdunitId
                    }
                });

            } else {
                window.top.ad_passback(AdunitId);
            }
        }
    };

    return {
        Init : _Init
    }

})(DisplayAdunitModule, DisplayConfigurationModule, DisplayUtilityModule, DisplayViewModule);
var ProgrammaticCriteoModule = (function (AdunitModule, UtilityModule) {

    var _Init = function(AdunitId){

        if(AdunitId){

            var AdObject = AdunitModule.Adunits.Get(AdunitId);

            if(AdObject.Programmatic.Criteo.Id && AdObject.AdType !== "fullpage"){

                var AdElement = UtilityModule.Element(AdObject.AdElement);

                var AdSource = AdObject.Programmatic.Criteo.Id;

                var AdSize = AdObject.Programmatic.Criteo.Size;

                if(AdSize.width === 336 && AdSize.height === 280)
                    AdSize = { width: 300, height: 250 };

                if(AdSize.width === 320 && AdSize.height === 100)
                    AdSize = { width: 320, height: 50 };

                AdElement.SetStyle("width", AdSize.width + "px");
                AdElement.SetStyle("height", AdSize.height + "px");
                AdElement.Html("");

                Criteo.DisplayAd({
                    "zoneid": AdSource,
                    "async": true,
                    "containerId" : AdunitId,
                    "callbackerror" : window.top.ad_passback(AdunitId)
                });
            } else {
                window.top.ad_passback(AdunitId);
            }
        }
    };

    return {
        Init : _Init
    }

})(DisplayAdunitModule, DisplayUtilityModule);
/**
 * Created by enesdabanlioglu on 24.10.2016.
 */
/**
 * Created by enesdabanlioglu on 24.10.2016.
 */
var ProgrammaticInroolModule = (function (AdunitModule, UtilityModule) {

    var _Init = function(AdunitId){

        if(AdunitId){

            var AdObject = AdunitModule.Adunits.Get(AdunitId);

            if(AdObject.Programmatic.InRool.Id && AdObject.Programmatic.InRool.Id.length >= 1){

                var AdElement = UtilityModule.Element(AdObject.AdElement);

                var AdSource = AdObject.Programmatic.InRool.Id;

                AdElement.Html("");
                AdElement.SetStyle("display", "none");

                var Library1 = document.createElement('script');
                Library1.src = decodeURIComponent(AdSource[0]);
                Library1.onload = function(){

                    var Library2 = document.createElement('script');
                    Library2.src = decodeURIComponent(AdSource[1]);
                    document.body.appendChild(Library2);
                };
                document.body.appendChild(Library1);

            } else {
                window.top.ad_passback(AdunitId);
            }
        }
    };

    return {
        Init : _Init
    }

})(DisplayAdunitModule, DisplayUtilityModule);
/**
 * Created by enesdabanlioglu on 24.10.2016.
 */
var ProgrammaticLigatusModule = (function (AdunitModule, ConfigModule, UtilityModule) {

    var _Init = function(AdunitId){

        if(AdunitId) {

            var AdObject = AdunitModule.Adunits.Get(AdunitId);

            if (AdObject.Programmatic.Ligatus.Id && AdObject.AdType !== "fullpage") {

                var AdObject = AdunitModule.Adunits.Get(AdunitId);

                var AdSource = AdObject.Programmatic.Ligatus.Id;

                var AdSize = AdObject.Programmatic.Ligatus.Size;

                var AdElement = UtilityModule.Element(AdObject.AdElement);

                AdElement.SetStyle("width", AdSize.width + "px");
                AdElement.SetStyle("height", AdSize.height + "px");
                AdElement.Html("");

                var LigatusFrame = document.createElement("IFRAME");
                LigatusFrame.style.width = AdSize.width + "px";
                LigatusFrame.style.height = AdSize.height + "px";
                LigatusFrame.frameBorder = 0;
                LigatusFrame.src = "http://a.ligatus.com/?ids=" + AdSource + "&t=async";

                AdElement.Append(LigatusFrame);
            } else {
                window.top.ad_passback(AdunitId);
            }
        }
    }

    return {
        Init : _Init
    }

})(DisplayAdunitModule, DisplayConfigurationModule, DisplayUtilityModule);
/**
 * Created by enesdabanlioglu on 24.10.2016.
 */
/**
 * Created by enesdabanlioglu on 24.10.2016.
 */
var ProgrammaticTagonModule = (function (AdunitModule, UtilityModule) {

    var _Init = function(AdunitId){

        if(AdunitId){

            var AdObject = AdunitModule.Adunits.Get(AdunitId);

            if(AdObject.Programmatic.Tagon.Id){

                var AdElement = UtilityModule.Element(AdObject.AdElement);

                var AdSource = AdObject.Programmatic.Tagon.Id;

                AdElement.Html("");
                AdElement.SetStyle("display", "none");

                var TagonLibrary = document.createElement('script');
                TagonLibrary.type = "text/javascript";
                TagonLibrary.src = "//js.tagon.co/tagon.js";
                TagonLibrary.onload = function(){

                    Tagon.Init([{
                        AccountId : AdSource.AccountId,
                        Format : "FULLPAGE",
                        InventoryId: AdSource.InventoryId,
                        AdunitId : AdSource.AdunitId,
                        FailCallback : function(){ window.top.ad_passback(AdunitId); },
                        SuccessCallback : function(){ }
                    }]);
                };

                document.body.appendChild(TagonLibrary);

            } else {
                window.top.ad_passback(AdunitId);
            }
        }
    };

    return {
        Init : _Init
    }

})(DisplayAdunitModule, DisplayUtilityModule);
/**
 * Created by enesdabanlioglu on 24.10.2016.
 */
var DisplayProgrammaticModule = (function (UtilityModule,
                                           ConfigurationModule,
                                           CriteoModule,
                                           AdxModule,
                                           LigatusModule,
                                           TagonModule,
                                           AdmaticModule,
                                           InroolModule,
                                           AdunitModule) {

    var _ProgressTable = {};

    var _RTBRank = ConfigurationModule.GetRTBRank() || [];

    var _GetNextSource = function(CurrentSource){

        var NextSource = null;
        if(!CurrentSource) {
            NextSource = _RTBRank[0];
        } else {

            for(var ProgressIndex = 0; ProgressIndex < _RTBRank.length; ProgressIndex++){
                if(CurrentSource == _RTBRank[ProgressIndex] &&
                    _RTBRank.length >= ProgressIndex + 2) {
                    NextSource = _RTBRank[ProgressIndex + 1];
                    break;
                }
            }
        }

        return NextSource;
    };


    var _Run = function(AdunitId){

        var CurrentSource = _GetNextSource(_ProgressTable[AdunitId]);

        if(!CurrentSource) {

            var AdObject = AdunitModule.Adunits.Get(AdunitId);

            var AdElement = UtilityModule.Element(AdObject.AdElement);

            AdElement.Html("");
            AdElement.SetStyle("display", "none");

        } else {

            _ProgressTable[AdunitId] = CurrentSource;

            if(CurrentSource === "criteo") CriteoModule.Init(AdunitId);
            else if(CurrentSource === "adx") AdxModule.Init(AdunitId);
            else if(CurrentSource === "ligatus") LigatusModule.Init(AdunitId);
            else if(CurrentSource === "admatic") AdmaticModule.Init(AdunitId);
            else if(CurrentSource === "inrool") InroolModule.Init(AdunitId);
            else if(CurrentSource === "tagon") TagonModule.Init(AdunitId);

            return null;
        }
    };

    return {
        Run : _Run,
        ProgressTable: _ProgressTable
    }

})(DisplayUtilityModule,
    DisplayConfigurationModule,
    ProgrammaticCriteoModule,
    ProgrammaticAdxModule,
    ProgrammaticLigatusModule,
    ProgrammaticTagonModule,
    ProgrammaticAdmaticModule,
    ProgrammaticInroolModule,
    DisplayAdunitModule);
/**
 * Created by enesdabanlioglu on 21.10.2016.
 */
var DisplayMopubModule = (function (UtilityModule, ProgrammaticModule, ViewModule, UserModule) {

    var _GetTargettingParameters = function(){

        var encodedText = "";

        encodedText += encodeURIComponent(UserModule.User.Browser.Name) + ",";
        encodedText += encodeURIComponent(UserModule.User.Carrier)+ ",";
        encodedText += encodeURIComponent(UserModule.User.City)+ ",";
        encodedText += encodeURIComponent(UserModule.User.Connection)+ ",";
        encodedText += encodeURIComponent(UserModule.User.Country)+ ",";
        encodedText += encodeURIComponent(UserModule.User.Language)+ ",";
        encodedText += encodeURIComponent(UserModule.User.Manufacturer)+ ",";
        encodedText += encodeURIComponent(UserModule.User.Model)+ ",";
        encodedText += encodeURIComponent(UserModule.User.OS.Name)+ ",";

        if(UserModule.User.City !== "ISTANBUL") encodedText += encodeURIComponent("ISTANBULDISI") + ",";

        return encodedText;
    };

    var _GetAd = function (AdObject) {

        var c_name = "mopub-udid-cookie";
        function get_cookie(name) {
            var start = document.cookie.indexOf(name + "=");
            var len = start + name.length + 1;
            if ((!start) && (name != document.cookie.substring(0, name.length)))
                return null;
            if (start == -1)
                return null;
            var end = document.cookie.indexOf(";", len);
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(len, end));
        }

        function get_session() {
            //if no session, set it
            if (!get_cookie(c_name) || window.location.hash === "#nofcap") {
                var now_date = new Date();

                document.cookie =
                    c_name + "=" + escape(UtilityModule.Guid()) +
                    ";expires=" + (new Date(now_date.getFullYear() + '/' + (now_date.getMonth() + 1) + '/' + now_date.getDate() + ' 23:59:59 GMT+0000')).toGMTString() +
                    ";path=/" +
                    ";domain=";
            }
            //get it
            return get_cookie(c_name);
        }

        var MopubAdUrl = "https://ads.mopub.com:/m/ad?id=" + AdObject.AdId + '&ufid=' + AdObject.AdunitId + '&q=' + _GetTargettingParameters() +'&mobile_web=1&udid=MOBILEWEBCOOKIE:' + get_session() + '&jsonp=1';

        UtilityModule.JsonpCall(MopubAdUrl,
            function(AdResponse, AdunitId) {

                ViewModule.Show(AdResponse);

            },
            function (ErrorMessage, AdunitId) {

                ProgrammaticModule.Run(AdunitId);

            });

    };

    return {
        GetAd : _GetAd
    };


})(DisplayUtilityModule, DisplayProgrammaticModule, DisplayViewModule, DisplayUserModule);
var DisplayLoaderModule = (function (AdUnitModule, MopubModule, UserModule) {

    var _Init = function(){

        var StyleFile = document.createElement("link");
        StyleFile.type = "text/css";
        StyleFile.rel = "stylesheet";
        StyleFile.href = "display.css";
        document.getElementsByTagName("head")[0].appendChild(StyleFile);

        UserModule.Init(function(){

            if(UserModule.User.Platform === "MOBILE")
            {
                var AdElements = document.getElementsByClassName("nmobs");

                for(var AdElementIndex = 0; AdElementIndex < AdElements.length; AdElementIndex++)
                {
                    if(!AdElements[AdElementIndex].hasAttribute("data-adstate"))
                    {
                        var AdUnit = AdUnitModule.ElementToAdunit(AdElements[AdElementIndex]);

                        MopubModule.GetAd(AdUnit);
                    }
                }
            }
        });
    }

    return {
        Init : _Init
    }

})(DisplayAdunitModule, DisplayMopubModule, DisplayUserModule);

window.top.ad_passback =
    window.top.ad_passback || (function(ProgrammaticModule){

        return function(AdunitId, Comment){

            setTimeout(function(){ ProgrammaticModule.Run(AdunitId); }, "1000");

        };

    })(DisplayProgrammaticModule);


DisplayLoaderModule.Init();




window.top.nmobs = {
    refresh : function(){
        DisplayLoaderModule.Init();
    }
};