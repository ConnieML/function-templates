/**
 *  Video Token
 *
 *  This Function shows you how to mint Access Tokens for Twilio Video. Please note, this is for prototyping purposes
 *  only. You will want to validate the identity of clients requesting Access Token in most production applications and set
 *  the identity when minting the Token.
 *
 *  Pre-requisites
 *   - Create an API Key (https://www.twilio.com/console/runtime/api-keys)
 */

const { createCORSResponse } = require('@twilio-labs/runtime-helpers').response;

exports.handler = function (context, event, callback) {
  /*
   * Change these values for your use case
   * REMINDER: This identity is only for prototyping purposes
   */
  const IDENTITY = 'testing-username';
  const ROOM = 'myroom';

  const { ACCOUNT_SID } = context;

  // set these values in your .env file
  const { API_KEY, API_SECRET } = context;

  const { AccessToken } = Twilio.jwt;
  const { VideoGrant } = AccessToken;

  const grant = new VideoGrant();
  grant.room = ROOM;

  const accessToken = new AccessToken(ACCOUNT_SID, API_KEY, API_SECRET);

  accessToken.addGrant(grant);
  accessToken.identity = IDENTITY;

  // set to true to support CORS
  const supportCors = false;
  /* istanbul ignore next */
  const response = supportCors
    ? createCORSResponse('*')
    : new Twilio.Response();

  response.appendHeader('Content-Type', 'application/json');
  response.setBody({ token: accessToken.toJwt() });
  callback(null, response);
};
