^XA
^FX Doc Setup
^PR3,2,2^PW800^PON^LH10,25^MD10

^FX Boxen and Lines
^FO0,0^GB780,1180,12^FS

^FX Horizontal Lines
^FO0,184^GB780,6,6^FS
^FO0,368^GB780,6,6^FS
^FO0,640^GB780,6,6^FS
^FO0,750^GB780,6,6^FS

^FX Vertical Lines
^FO264,0^GB6,184,6^FS
^FO440,184^GB6,184,6^FS

^FX Ship From
^CFQ
^FO20,25^FDSHIP FROM^FS

^CF0,20
^FO20,68^FDOshkosh Cold Storage^FS

^CF0,18
^FO20,100^FD2233 Address St^FS
^FO20,125^FDPlymouth, WI 44444^FS

^FX Ship To
^CFQ
^FO280,25^FDSHIP TO^FS

^CFS
^FO280,60^FDWalmart GDC 0000A - ASM DIS^FS

^CF0,18
^FO280,105^FD5841 SW Regional Airport Blvd^FS
^FO280,130^FDBentonville, AR 72712^FS

^FX Postal Code
^CFQ
^FO20,205^FDPOSTAL CODE^FS

^CFA,20
^FO160,240^FD(420)72712^FS

^FX Define Code 128 Postal Bar Code
^BY3,2,80^BCN,80,N,N,N,D
^FO90,265^FD(420)72712^FS

^FX Carrier
^CFQ
^FO460,205^FDCARRIER^FS

^CF0,20
^FO460,250^FDCarrier Name^FS
^FO460,280^FDPRO: 1234567890^FS
^FO460,310^FDB/L: 1234567890^FS

^FX Item Information
^CFA,22^FO55,400^FDGDC#^FS
^CFU^FO30,425^FD0000^FS

^CFA,22^FO215,400^FDTYPE^FS
^CFA,40^FO190,445^FD0033^FS

^CFA,22^FO350,400^FDDEPT^FS
^CFA,40^FO320,445^FD00012^FS

^CFA,22^FO570,400^FDORDER#^FS
^CFU^FO480,425^FD01234567890^FS

^CFD,30^FO30,520^FDWMIT: MIXED PALLET^FS
^CFD,30^FO30,580^FD# of Cases: (48 Cases)^FS

^FX Pallet Description
^CFU
^FO230,670^FDMIXED PALLET^FS

^FX SSCC License Plate
^CFQ
^FO20,770^FDSSCC LICENSE PLATE^FS

^FX Define Code 128 SSCC License Plate Bar Code
^BCN,250,N,N,N,D
^FO150,840^FD(00)001234560000577633^FS

^CFE
^FO160,1100^FD(00)001234560000577633^FS

^XZ
