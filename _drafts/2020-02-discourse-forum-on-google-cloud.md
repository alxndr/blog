Notes on setting up [the Discourse open-source forum software](https://discourse.org) on a free tier of [Google Cloud Platform](https://cloud.google.com/).

For This You Will Need...
* a domain name
* an email account / SMTP server

Using the [cloud setup doc](https://github.com/discourse/discourse/blob/85310f8/docs/INSTALL-cloud.md) as a guide.
This looks even better https://cloud-google-drive.blogspot.com/2019/07/how-to-install-discourse-forum-on.html

Sign up for the free trial with GCP.
It offers $300 in credits for the next 90 days.

Recent minimum requirements for Discourse are a system with >=1 GB of RAM and >=10 GB disk space.
Suggestion to use Ubuntu Bionic...
https://meta.discourse.org/t/discourse-on-google-compute-engine/8748/28?u=alxndr

Create and start a VM instance: https://cloud.google.com/compute/docs/instances/create-start-instance

App Engine...
My First Project screenshot...
"Create Application" button
has us pick a region... us-east4
Language: Ruby
Environment: Standard https://cloud.google.com/appengine/docs/the-appengine-environments

then create a new Compute Engine ...thing
asks Create, Import, Quickstart... pick Create

now we pick name / stats / basic options for the VM...

E2
* micro: 2 vCPU, 1 GB RAM -> $7.32/mo estimate
* small: 2 vCPU, 2 GB RAM -> $14.22/mo estimate
* medium: 2 vCPU, 4 GB RAM -> $27.99/mo estimate

picked small

change boot disk to Ubuntu 18.04 LTS (which is entering Maintenance Mode soonish [according to their schedule](https://ubuntu.com/about/release-cycle))
NEEDS >20GB disk storage... otherwise Discourse can't install itself!!
using 50GB, estimated cost a penny more per month than 5GB...

check-on allowing http & https traffic

Create... it spins up

get the public IP address for that VM instance, and add an A record to your DNS pointing to that IP address...

Under "Connect" column we can get SSH access to this new VM instance

    $ sudo apt update
    ...
    $ sudo apt upgrade
    ...
    The following package was automatically installed and is no longer required:
      libnuma1
    Use 'sudo apt autoremove' to remove it.
    The following packages will be upgraded:
      apport ca-certificates python3-apport python3-problem-report
    4 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
    Need to get 364 kB of archives.
    After this operation, 16.4 kB disk space will be freed.
    Do you want to continue? [Y/n] y
    ...
    $ sudo apt autoremove
    ...
    After this operation, 78.8 kB disk space will be freed.
    Do you want to continue? [Y/n] y
    ...
    $ sudo apt-get install apt-transport-https
    ...
    $ sudo apt-get install gnupg-agent
    ...
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    OK
    
    $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    ...
    $ sudo apt update
    ...
    $ sudo apt-get install docker-ce
    ...
    The following additional packages will be installed:
      containerd.io docker-ce-cli docker-ce-rootless-extras libltdl7 pigz
    Suggested packages:
      aufs-tools cgroupfs-mount | cgroup-lite
    Recommended packages:
      slirp4netns
    The following NEW packages will be installed:
      containerd.io docker-ce docker-ce-cli docker-ce-rootless-extras libltdl7 pigz
    0 upgraded, 6 newly installed, 0 to remove and 0 not upgraded.
    Need to get 103 MB of archives.
    After this operation, 450 MB of additional disk space will be used.
    Do you want to continue? [Y/n] y
    ...
    $ sudo git clone https://github.com/discourse/discourse_docker.git /var/discourse
    ...
    $ cd /var/discourse
    $ sudo ./discourse-setup

Now try hitting that subdomain!
There's a multi-step web-based setup wizard to go through afterwards, but that's the fun part...
