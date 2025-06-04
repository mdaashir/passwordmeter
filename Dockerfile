FROM nginx:alpine

RUN mkdir -p /var/cache/nginx/client_temp /var/run && \
    chown -R nginx:nginx /var/cache/nginx /var/run && \
    chmod -R 755 /var/cache/nginx && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid && \
    rm -rf /var/cache/apk/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod 644 /etc/nginx/conf.d/default.conf && \
    chown nginx:nginx /etc/nginx/conf.d/default.conf

COPY --chown=nginx:nginx . /usr/share/nginx/html/

USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=3 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
