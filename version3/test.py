import os

# while(True):
#     for i in range(100):
#         os.system("mosquitto_pub -d -t game -m " + str(i))
#         print(i)
#     for i in range(100, 0, -1):
#         os.system("mosquitto_pub -d -t game -m " + str(i))
#         print(i)

while (True):
   os.system("mosquitto_pub -d -t game -m " + str(60)) 