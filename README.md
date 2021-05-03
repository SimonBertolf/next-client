# reamis-next-client

[![Vue.js](https://img.shields.io/static/v1?label=built+with&message=Vue.js&color=42b983)](https://vuejs.org/)
[![Ant Design](https://img.shields.io/static/v1?label=built+with&message=Ant+Design&color=F74455)](https://antdv.com/)
[![Docker](https://img.shields.io/static/v1?label=shipped+with&message=Docker&color=287cf9)](https://www.docker.com/)
[![embrio.tech](https://img.shields.io/static/v1?label=by&message=EMBRIO.tech&color=24ae5f)](https://embrio.tech)
[![reamis](https://img.shields.io/static/v1?label=by&message=reamis&color=ac132e)](https://www.reamis.com/)

Client application of reamis MCS.

## Table of Contents

[Introduction](#introduction)  
[Requirements](#requirements)  
[Installation](#installation)  
[Configuration](#configuration)  
[Concepts](#concepts)  
[Usage](#usage)  
[Testing](#testing)  
[Deployment](#deployment)  
[Reference](#reference)

## Introduction

reamis-ui is a progressive web app built with vuejs,
the purpose of it is to achieve a modern look and feel and an increase in productivity.

## Requirements

[nodejs](https://nodejs.org/en/) – The version is specified in [.nvmrc](/.nvmrc)  
[npm](https://www.npmjs.com/)  
[vue-cli](https://cli.vuejs.org/)  
[yo](https://www.npmjs.com/package/yo)  
[@storybook/cli](https://www.npmjs.com/package/@storybook/cli)

## Installation

- `npm install` - installs all dependencies for reamis-ui
- `cd generator-reamis-next` - change directory to reamis-ui/generator-reamis-next
- `npm install` - installs all dependencies for the reamis-ui generators
- `npm link` - makes the generators global available
- `cd ..` - go back to the root directory

## Configuration

create a `.env` file in the root directory  
`VUE_APP_I18N_LOCALE=de` - the main language code  
`VUE_APP_I18N_FALLBACK_LOCALE=de` - the fallback language code if the preferred language is unsupported  
`VUE_APP_I18N_LOCALE_PATH=@/locales` - Path to the translations

## Concepts

To achieve a common workflow some boilerplate where implemented.  
The boilerplate should make it easier to follow the principles of [test driven development](https://en.wikipedia.org/wiki/Test-driven_development).

#### Components

Components are the core of the frontend, they are divided in 2 types:

- Presentational Compoents - These components are stateless, they deal with the question "how things look"
- Container Components - These components are stateful, they deal with the question "how things work"

#### Services

A Service provides functionality that are not related to a component and that did not require reactivity, for example an api service that fetches something from a backend.  
The services are provided via an [ioc container](https://de.wikipedia.org/wiki/Inversion_of_Control) to improve flexibility and to apply the [dependency inversion principle](https://de.wikipedia.org/wiki/Dependency-Inversion-Prinzip).

#### Models

Models are types that are business related, for example a "Keyfigure" will be a model of reamis-ui.
There is one thing to keep in mind, this models are used for the frontend not for the backend. It's okey when the Model from the backend are different, only the business case must be covered.  
Because the reamis-ui depends on a backend service, a possibility to react to changes is needed. If a change appears, instead of rewriting the codebase it's recommended to implement an [interceptor](https://en.wikipedia.org/wiki/Interceptor_pattern).

#### Types

Types are types that are component related.

#### Theme

To make a consistent frontend a theme for styles will be provided, this includes colors, font family, font size, gradients and so on

#### Store

#### Localization

#### Generators

## Usage

## Testing

## Deployment

## Reference
