#!/bin/sh

now -E .env -C -f \
    && now alias \
    && now rm maximilian --safe --yes