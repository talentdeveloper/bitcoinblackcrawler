import React, { Fragment } from "react";
import { TranslatedMessage } from "lib/TranslatedMessage";
import _ from "lodash";

import AccountLink from "../AccountLink";

export default class RandomVerifiedAccounts extends React.Component {
  state = { accounts: [] };

  async componentDidMount() {
    const data = await fetch("http://18.233.201.235/api/accounts/verified", {
      mode: "cors"
    });
    const accounts = await data.json();

    this.setState({ accounts: _.sampleSize(accounts, this.props.count) });
  }

  render() {
    return (
      <Fragment>
        <h3 className="mb-0">
          <TranslatedMessage id="ninja.verified_accounts" />
        </h3>
        <p className="text-muted">
          <TranslatedMessage
            id="ninja.verified_accounts.desc"
            values={{
              link: (
                <a
                  href="http://18.233.201.235"
                  target="_blank"
                  className="text-muted"
                >
                  My Bitcoinblack Ninja
                </a>
              )
            }}
          />
        </p>

        <hr />

        {this.state.accounts.map(account => (
          <VerifiedAccount key={account.account} account={account} />
        ))}
      </Fragment>
    );
  }
}

const VerifiedAccount = ({ account }) => {
  return (
    <div className="row">
      <div className="col">
        <h5 className="mb-0">
          <AccountLink
            account={account.account}
            name={account.alias}
            className="text-dark break-word"
          />
        </h5>
        <p>
          <AccountLink
            account={account.account}
            className="text-muted break-word"
          />
        </p>
      </div>
    </div>
  );
};
