#!/bin/bash
set -euo pipefail
umask 077
container=56453d9c-6ec2-483c-ae2d-f19dfce1f419
volume=/var/lib/pelican/volumes/$container
destination=/root/backups/dnd-tech-profile
mkdir -p "$destination"
chmod 700 "$destination"
exec 9>/run/lock/dnd-tech-profile-backup.lock
flock -n 9 || exit 0
docker exec "$container" node scripts/backup-data.mjs
tar -czf "$destination/$(date -u +%Y%m%dT%H%M%SZ).tar.gz" -C "$volume" data/backup-snapshot.sqlite data/uploads data/runtime.env
printf 'DND profile backup completed\n'
