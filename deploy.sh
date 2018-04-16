#!/bin/sh

now -E .env -C -f --region bru \
    && now alias \
    && now rm maximilian --safe --yes