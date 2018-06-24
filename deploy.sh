#!/bin/sh

now -E .env.prod -C \
    && now alias \
    && now rm maximilian --safe --yes