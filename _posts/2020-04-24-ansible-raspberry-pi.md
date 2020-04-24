---
layout: post
title: "Ansible and Raspberry Pi"
date: 2020-04-24 12:00:00 -0400
image: /assets/images/posts/harrison-broadbent-bw5a4zQMRCI-unsplash.jpg
tags:
  - raspberry pi
  - ansible
---

I've been playing with _Raspberry Pi_ computers for a while; I bought my first back in 2015. Since then I've bought more than I can remember. Setting them up has always been a ritual: I got a cheap USB keyboard/mouse combo, a USB/Ethernet adapter for my Mac and all the right HDMI cables, the mini included for the Zero.

I knew I couldn't keep searching for the right syntax for `dd` everytime I wanted to set up a Pi and that keyboard/mouse set is a strain to the eyes. I would prefer to keep them hidden. I wrote this _Shell_ and _Ansible_ scripts to get faster to the fun bits of the projects.

> This was originally written as a [personal project's README](https://github.com/leonelgalan/ansible-pi), so it's format might be a combination of that and a blog post. - _Me in the editor role_

## Install Raspbian

### Network Configuration

For those Pis with wireless connectivity, We can have them connect to a wireless network on its first boot by adding a _wpa_supplicant.conf_ to the SD card before.

Make a copy of [_wpa_supplicant.conf_](https://github.com/leonelgalan/ansible-pi/blob/master/wpa_supplicant.conf.example) and fill in your network's name (ssid) and pre-shared key (psk), configure other properties as needed (e.g. country):

```sh
cp wpa_supplicant.conf.example wpa_supplicant.conf
code wpa_supplicant.conf
```

```conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
  ssid=""
  psk=""
  key_mgmt=WPA-PSK
}
```

### Prepare your SD Card

All the code in this section should be run on the same terminal session. Just make sure you edit the `IMAGE_NANE` and `DISK` variables before.

#### Download Raspian

Choose the Raspian image of your choice and download it from [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/). Modify `IMAGE_NAME` before running.

```sh
# Options: raspbian (Desktop), raspbian_full (Desktop with recommended software), raspbian_lite (Lite)
IMAGE_NANE=raspbian_lite
curl --location --remote-name "https://downloads.raspberrypi.org/${IMAGE_NANE}_latest"
unzip *.zip
rm *.zip
IMAGE=$(ls *.img)
```

### Copy Raspbian and Setup the Network

Insert your card and find the disk's name: `diskN`, where `N` is a number. Identify the disk (not the partition) of your SD card (`disk2`, not `disk2s1`) by looking at its size  (for example, a 16GB SD card might show as *15.5 GB

```sh
diskutil list
```

**Make sure you modify `DISK` before.** Copy raspbian to the card and setup the network to:

1. Connect to a wireless network.
2. Accept incoming SSH connections.

```sh
DISK=disk2
diskutil unmountDisk /dev/$DISK
sudo dd bs=1m if=$IMAGE of=/dev/r$DISK conv=sync
# Between few seconds and a couple of minutes, Ctrl+T to view Progress

# Copy the wpa_supplicant.conf you created above
cp wpa_supplicant.conf /Volumes/boot/
# Enable incoming SSH connections by creating an empty ssh file.
touch /Volumes/boot/ssh

# Eject the SD card properly
sudo diskutil eject /dev/r$DISK
```

### Find your Raspberry Pi's IP Address

Insert the SD card on the and turn on your Pi; Wait about 1 minute for it to boot.

Find your Raspberry Pi's IP address by searching for part of its MAC Address:

```sh
$ sudo nmap -sP 192.168.1.0/24 | awk '/^Nmap/{ip=$NF}/B8:27:EB/{print ip}
192.168.1.11
```

You might need to install _nmap_ before. See additional details in this [Stack Exchange's post](https://raspberrypi.stackexchange.com/a/13937). Copy this IP address to the [_hosts_](https://github.com/leonelgalan/ansible-pi/blob/master/hosts) file under `[pi]`:

```
[pi]
192.168.1.11
```

### Install Ansible's requirements and Run _step01.yml_

#### A note about Ansible

> Ansible is an open-source software provisioning, configuration management, and application-deployment tool. - [Wikipedia: Ansible (software)](https://en.wikipedia.org/wiki/Ansible_(software))

##### What You Need to Know?

* _hosts_ define the list of hosts, playbooks say in which hosts they run. We are saying there is host _pi_ and its IP Address.
* The playbooks, defines in which hosts are going to run or "all", as who (what user) and what roles to run and their configuration.
* Roles are groupings of functionality, which facilitates sharing and there are plenty hosted in the Ansible Galaxy. This "project" has one local role and uses two from the Ansible Galaxy, listed in the [_requirements.yml_](https://github.com/leonelgalan/ansible-pi/blob/master/requirements.yml) and installed by calling the `ansible-galaxy` command below.
* A project might have local roles, in this case [_pip3_](https://github.com/leonelgalan/ansible-pi/tree/master/pip3). Inside of it the folders are named appropriately, you should explore its contents to peek inside of how Ansible works.
* Each role's documentation should tell you what the role can do and how to set it up.

#### [_step01.yml_](https://github.com/leonelgalan/ansible-pi/blob/master/step01.yml)

This is the minimum configuration I do on my Raspberry Pi's before using them. It adds a single role: _raspi_config_ which does some configuration by default, but allows me to override those to better suit my needs.

##### Implicit (default)

* Update and Upgrade
* Expand filesystem to fill the SD card
* Setup the Locale: `en_US.UTF-8`

##### Explicit

* Setup my timezone to `America/New_York`, default is `UTC`
* Enable the camera, if that's my intended use for this particular Pi
* Replace the default **pi** user with myself (`whoami`) and copy my public ssh key, so I can ssh in without specifying a user or typing a password.

Find the defaults and additional settings on the [role's README](https://github.com/mikolak-net/ansible-raspi-config). **Edit _step01.yml_ as needed before running** the following lines:

```sh
ansible-galaxy install -r requirements.yml
ansible-playbook _initial.yml -i hosts --ask-pass
```

### Run [_step02.yml_](https://github.com/leonelgalan/ansible-pi/blob/master/step02.yml)

Now connected as the user you just created (`remote_user: leonelgalan`, **REMEMBER** to change this), install the packages you might need, **edit step02.yml_** based on your desire setup:

* Packages:
  * `python3-pip`
  * `sense-hat`
  * `python-smbus`
  * `i2c-tools`
  * `python-setuptools`
* Python Packages
  * Upgrade `setuptools`
  * `RPI.GPIO`
  * `adafruit-circuitpython-htu21d`

```sh
ansible-playbook step02.yml -i hosts --ask-pass
```

### Build Something

This is a short list of projects I've built with Pis, hopefully it inspires you to build something:

* My latest project is a timelapse camera / humidity and temperature sensor to keep track of my new sourdough starter: "Paco" and its offspring levains, naturally called "Paquito"
* I was growing some chili peppers from seeds and used a Raspberry Pi with the SenseHat's display as a dashboard of sorts; I wanted to measure the soil humidity, air temperature/humidity, and light
* I build hat for a Raspberry Pi Zero W, with a NoIR camera and a custom IR lamp (three super bright leds)The led can be controlled through one of the GPIO pins, so it can be turn on and off with the camera
* There is one behind my office TV that boots into Chrome's Kiosk mode with a business dashboard
* There is another behind my living room TV that orchestrates local media: sync to computers, local and remote backups. Because it's always running it's always doing something else: track temperature, internet speed, etc.

___

<small>
  Photo by [Harrison Broadbent](https://unsplash.com/photos/bw5a4zQMRCI)
</small>
