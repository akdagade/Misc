// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // your code here
        var s = document.getElementsByTagName("video")[0].src;
        var t = document.getElementsByClassName("course-info__title")[0].innerHTML;
        var t1 = document.getElementsByClassName("course-info__section hidden-xxs hidden-xs")[0].innerHTML.split(",")[0].split(" ")[2];
        var e = document.getElementsByClassName("course-info__section hidden-xxs hidden-xs")[0].innerHTML.split(",")[1].split(" ")[2];
        var sec = document.getElementsByClassName("curriculum-navigation__section__title")[t1-1].getElementsByTagName('span')[0].innerHTML;
        //alert(t);
        var filenm = String(t1) + " " + sec + "-" + e + " " + t;
        //alert(String(t1) + " " + sec + "-" + e + " " + t);
        //alert(sec);


        //https://udemy-assets-on-demand2.udemy.com/2017-09-24_23-25-40-ddf16af0f2ba0baf84092b0cf7692f00/WebHD_720p.mp4?nva=20180323013424\u0026token=025ed7b9a337fd7df5a4f
        if(s != ''){
            if (confirm('Are you sure you want to save this video?')) {
                // Save it!
                window.URL = window.URL || window.webkitURL;
                var xhr = new XMLHttpRequest();
                var element = document.createElement('a'), file;
                xhr.open('GET', s, true);
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    file = new Blob([xhr.response], { type : 'application/octet-stream' });
                    element.href = window.URL.createObjectURL(file);
                    element.download = filenm + '.mp4';  // Set to whatever file name you want
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    // Now just click the link you created
                    // Note that you may have to append the a element to the body somewhere
                    // for this to work in Firefox
                    element.click();
                    document.body.removeChild(element);
                };
                xhr.send();
                
            } else {
                // Do nothing!
                //var link = s
                //alert(link);
            }
        }

    }, false);
    // Your code here...
})();