FROM ubuntu:latest

ENV RUNNER_VERSION=2.285.0
ENV ARCHITECTURE=arm64

RUN apt-get update \
RUN apt-get install -y --no-install-recommends ca-certificates curl libicu-dev netcat

WORKDIR /actions-runner
RUN curl -o actions-runner.tar.gz -L https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-${ARCHITECTURE}-${RUNNER_VERSION}.tar.gz
RUN tar xzf actions-runner.tar.gz

# RUN /actions-runner/bin/installdependencies.sh
# RUN /actions-runner/svc.sh install

COPY entrypoint.sh .
RUN adduser --no-create-home ghrunner -uid 1001
RUN chown -R ghrunner:ghrunner /actions-runner
USER ghrunner

EXPOSE 3000
ENTRYPOINT ["/actions-runner/entrypoint.sh"]
