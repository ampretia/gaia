# gaia

Keep control of all those environment configurations!

## Why?
Last few years, managing different systems (K8S, Tekton Pipelines, etc. etc.) and running container images, there is a lot of configuration via Environment Variables.
Some of these hold API Keys, secrets, or semi-secret internal APIs.  Stuff you don't want to check into git... but at the same time don't actually want to loose.

Yes I've done `git clean -xdf` and... oh sugar... I need a new API key again.

## What does it do for me?
Gaia does this for you.

- Local store in your home folder of different `.env` files or environments
- Quick retrieval of these for setting in your shell

ToAdd

- quick edit of the file
- Add a new property to the .env file
- export an encrypted set that you can store elsewhere.

## How does it do it?

### Install

```
npm install -g @ampretia/gaia
```

All files are stored in a `~/.gaia`. A `~/.gaia/config.json` file contains configuration information for gaia.

## Add a new environment file

Syntax off the files are:

```
# I am a comment
KEY=VALUE
```

To *copy* a current file to gaia

```
gaia store -f <filename.env>
```

If the filename already exists, an error is given.
If the filename is `.env` then the directory of the file is used, if this name then exists and error is given.

To list the files being held

```
gaia list
```


To list just the keys and values

```
gaia show
```

The idea here is that this should be used with 
```
export $(gaia show ledger-messaging | xargs)
```