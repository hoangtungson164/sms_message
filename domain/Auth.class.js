module.exports = function auth(auth_user) {
    const {
        GRANT_TYPE,
        CLIENT_ID,
        CLIENT_SECRET,
        SCOPE,
        SESSION_ID
    } = auth_user;

    this.grant_type = GRANT_TYPE;
    this.client_id = CLIENT_ID;
    this.client_scecret = CLIENT_SECRET;
    this.scope = SCOPE;
    this.session_id = SESSION_ID; 
}