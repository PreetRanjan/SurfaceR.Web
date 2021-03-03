# SurfaceR.Web
The SignalR Hub syncing data of device orientation data with a virtual cube.

## SurfaceR
A SignalR App that changes the dummy objects orientation in sync with the connected smartphone. It uses SignalR for real time communication and data syncing.

## Demo

## How does it work?
Step-1 You open the website and click on "See In Action" It opens up an image which changes it's orientation.
Step -2 There is two way to change the orientation of the image.
You open up the same website in an another device and click on the "Controls". As you change th e orientation using the Axes controllers or the Gyroscope controllers the image will change its orientation.
You download the SurfaceR Android or iOS app and then turn on the button & boom!. The images changes its orientation with the help of the current orientation of the smartphone.


## Behind the Scenes
The orientation data of the smartphone is synced with the rotation property of the image. As the device orientation change is detected it senda the infor about it's X,Y and Z axes and the images rotates itself according to it as it is listing for the data from the SignalR hub in the server.

In the same way the slider X,Y,Z values and also sent to the SignalR hub to which the surfaceR client or the image is listening. As you move the slider it send the infor to the hub and the image orientation is changed.
