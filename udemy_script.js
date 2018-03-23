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
        var ifvideo=-1;
        var s,t,t1,e,sec,filenm;
        if (document.getElementsByTagName("video")[0] != null){
            ifvideo=1;
            s = document.getElementsByTagName("video")[0].src;
            t = document.getElementsByClassName("course-info__title")[0].innerHTML;
            t1 = document.getElementsByClassName("course-info__section hidden-xxs hidden-xs")[0].innerHTML.split(",")[0].split(" ")[2];
            e = document.getElementsByClassName("course-info__section hidden-xxs hidden-xs")[0].innerHTML.split(",")[1].split(" ")[2];

            sec = document.getElementsByClassName("curriculum-navigation__section__title")[t1-1].getElementsByTagName('span')[0].innerHTML;
            filenm = String(t1) + ". " + sec + "$$" + e + " " + t;
        }
        else if(document.getElementsByClassName("message-container message-container--article") != null){

            ifvideo=0;
            t = document.getElementsByClassName("message-container message-container--article")[0].getElementsByTagName('div')[0].innerHTML;
            t1 = document.getElementsByClassName("message-container message-container--article")[0].getElementsByTagName('div')[1].innerHTML.split(",")[0].split(" ")[1];
            e = document.getElementsByClassName("course-info__section hidden-xxs hidden-xs")[0].innerHTML.split(",")[1].split(" ")[2];
            //alert(document.getElementsByClassName("curriculum-navigation__section__title")[t1-1].innerHTML);
            sec = document.getElementsByClassName("curriculum-navigation__section__title")[t1-1].getElementsByTagName('span')[0].innerHTML;
            //alert(String(t1) + ". " + sec + "$$" + e + " " + t);
            filenm = String(t1) + ". " + sec + "$$" + e + " " + t;
        }

        //alert(t);
        //alert(String(t1) + " " + sec + "-" + e + " " + t);
        //alert(sec);


        //https://udemy-assets-on-demand2.udemy.com/2017-09-24_23-25-40-ddf16af0f2ba0baf84092b0cf7692f00/WebHD_720p.mp4?nva=20180323013424\u0026token=025ed7b9a337fd7df5a4f
        if(ifvideo == 1){
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

            }
        }
        else if(ifvideo == 0){
            if (confirm('Are you sure you want to save this page?')) {
                var content = document.getElementsByClassName("message-container message-container--article")[0].innerHTML;
                //alert (content);
                var body =  '<body>' + content +'</body>';

                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:attachment/text,' + encodeURI(body);
                hiddenElement.target = '_blank';
                hiddenElement.download = filenm + '.html';
                hiddenElement.click();
            }
        }

    }, false);
    // Your code here...
})();
