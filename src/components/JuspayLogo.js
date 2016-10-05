var logo = "\
            <style>\
                #juspay-logo {\
                    width: 64px; height: 64px;\
                    -webkit-animation-name: spin;\
                    -webkit-animation-duration: 2000ms;\
                    -webkit-animation-iteration-count: infinite;\
                    -webkit-animation-timing-function: linear;\
                    -moz-animation-name: spin;\
                    -moz-animation-duration: 2000ms;\
                    -moz-animation-iteration-count: infinite;\
                    -moz-animation-timing-function: linear;\
                    -ms-animation-name: spin;\
                    -ms-animation-duration: 2000ms;\
                    -ms-animation-iteration-count: infinite;\
                    -ms-animation-timing-function: linear;\
                    animation-name: spin;\
                    animation-duration: 2000ms;\
                    animation-iteration-count: infinite;\
                    animation-timing-function: linear;\
                }\
                @-ms-keyframes spin { \
                    from { -ms-transform: rotate(0deg); }\
                    to { -ms-transform: rotate(360deg); }\
                }\
                @-moz-keyframes spin {\
                    from { -moz-transform: rotate(0deg); }\
                    to { -moz-transform: rotate(360deg); }\
                }\
                @-webkit-keyframes spin {\
                    from { -webkit-transform: rotate(0deg); }\
                    to { -webkit-transform: rotate(360deg); }\
                }\
                @keyframes spin {\
                    from { transform:rotate(0deg); }\
                    to { transform:rotate(360deg); }\
                }\
                </style>"
logo += "<br><br><br><div align='center'><div style='font-size: 32px;'>"
logo += "<img id='juspay-logo' src='https://d3oxf4lkkqx2kx.cloudfront.net/images/juspay-logo-v2-64x64.png'/>"
logo += "<p style='font-size: 16px; '>Please do not refresh the page or click the back or close button of your browser.</p>"
logo += "</div></div>"

module.exports = logo;