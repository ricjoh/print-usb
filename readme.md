# Zebra Network Pinter

> A packaged app for windows that runs at //localhost:2345 and allows EPL files to be copied to Zebra USB Printer

## To Build

1. Run `npm install`
2. Run `pkg .`

## To distribute
Run print-usb.exe

## Zebra GX420t DHCP (Network Reset)

<div class="iframe-container" data-aura-rendered-by="80:140;a"><div class="slds-p-vertical_x-small slds-size_12-of-12" data-aura-rendered-by="84:140;a"><lightning-formatted-rich-text class="p slds-rich-text-editor__output" data-data-rendering-service-uid="96" data-aura-rendered-by="82:140;a"><span part="formatted-rich-text">To perform a factory reset on this printer, you will need to use the <b>FEED </b>Button.
<ol><li>Power ON the printer and close the top cover.</li><li>Press and hold the FEED button for several seconds.</li><li>The green status LED will flash a number of times in sequence.</li></ol>
<br>The explanation below will show what happens when you release the key after the start specific number of flashes and before the next flash sequence starts.

#### 4-Flash Sequence (Followed by below sequence)

Once the printer entered Factory Default mode, the status light will turn amber for three (3) seconds.<br><br>Press and hold the FEED button again to enter the factory default reset modes for printers with a network (Ethernet, Wi-Fi or Bluetooth) printer option (equivalent ZPL command <span style="font-family: Courier New,Courier,monospace;">^JUF</span>).

#### 1-Flash Sequence
Releasing the button after the first flash resets the network factory options only. (equivalent ZPL command<span style="font-family: Courier New,Courier,monospace;"> ^JUN</span>).

#### 2-Flash Sequence
Releasing the button after the second flash sequence (two flashes) will reset the printer defaults only.

#### 3-Flash Sequence
Releasing the button after the third flash sequence (three flashes) will reset both printer and network settings (equivalent ZPL commands <span style="font-family: Courier New,Courier,monospace;">^JUN</span> and <span style="font-family: Courier New,Courier,monospace;">^JUF</span></span></lightning-formatted-rich-text></div>

#### Get IP Address
1. Power cycle printer.
2. Press and hold feed button until green light blinks once.
3. Release feed button.
4. IP address will print.
