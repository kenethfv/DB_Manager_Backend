const headers = require("./lib/headers");
const getBody = require("./lib/getBody");
const schema = require("./schemas/service.schema");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const login = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let response = {
    statusCode: 409,
    headers,
    body: JSON.stringify({
      message: "Error getting branches, check parameters.",
    }),
  };

  const body = getBody(event) || {};
  const data = {
    ...body,
    ...event.pathParameters,
    ...event.queryStringParameters,
  };
  console.info(`data ${JSON.stringify(data)}`);

  const { error, value } = schema.login.validate(data, { abortEarly: false });

  if (error) {
    response = {
      error: true,
      statusCode: 400,
      message: error.details.map((e) => e.message),
    };
  } else {
    const { host, user, password } = value;
    console.info(`Login to DB with: host: ${host}, user ${user}`);

    var con = mysql.createConnection({
      host,
      user,
      password,
    });

    con.connect(function (err) {
      if (err) {
        response = {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            statusCode: 400,
            message: "Connection Error",
          }),
        };
        callback(null, response);
      }
      const signature = jwt.sign(
        {
          data: "ProyectoDesarrolloWeb",
        },
        "umg2022",
        { expiresIn: "5m" }
      );
      console.log("signature", signature);

      console.log("Connected!");
      response = {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          statusCode: 200,
          message: `Connection Success`,
          signature,
        }),
      };
      callback(null, response);
    });
  }
};

const querys = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let response = {
    statusCode: 409,
    headers,
    body: JSON.stringify({
      message: "Error getting branches, check parameters.",
    }),
  };

  const body = getBody(event) || {};
  const data = {
    ...body,
    ...event.pathParameters,
    ...event.queryStringParameters,
  };
  console.info(`data ${JSON.stringify(data)}`);

  const { error, value } = schema.querys.validate(data, { abortEarly: false });

  if (error) {
    response = {
      error: true,
      statusCode: 400,
      message: error.details.map((e) => e.message),
    };
  } else {
    const { host, user, password, database, query } = value;
    console.info(
      `Login to DB with: host: ${host}, user ${user} for query ${query}`
    );

    if (event.headers.Authorization) {
      try {
        const decodeSignature = jwt.verify(
          event.headers.Authorization,
          "umg2022"
        );
        console.log("decodeSignature", JSON.stringify(decodeSignature));

        var con = mysql.createConnection({
          host,
          user,
          password,
          database,
          multipleStatements: true,
        });

        con.connect(function (err) {
          if (err) {
            response = {
              statusCode: 400,
              headers,
              body: JSON.stringify({
                statusCode: 400,
                message: "Connection Error",
              }),
            };
            callback(null, response);
          }
          con.query(query, function (err, result, fields) {
            if (err) {
              console.log(err);
              response = {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                  statusCode: 400,
                  message: err,
                }),
              };
              callback(null, response);
            }
            console.log(result);
            console.log(fields);
            response = {
              statusCode: 200,
              headers,
              body: JSON.stringify({
                statusCode: 200,
                data: result,
              }),
            };
            callback(null, response);
          });
        });
      } catch (error) {
        response = {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            statusCode: 401,
            message: "Token invalido",
          }),
        };
        callback(null, response);
      }
    } else {
      response = {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          statusCode: 401,
          message: "Se necesita Token para avanzar",
        }),
      };
      callback(null, response);
    }
  }
};

const getConnections = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let response = {
    statusCode: 409,
    headers,
    body: JSON.stringify({
      message: "Error getting branches, check parameters.",
    }),
  };

  const body = getBody(event) || {};
  const data = {
    ...body,
    ...event.pathParameters,
    ...event.queryStringParameters,
  };
  console.info(`data ${JSON.stringify(data)}`);

  const { error, value } = schema.getConnections.validate(data, {
    abortEarly: false,
  });

  if (error) {
    response = {
      error: true,
      statusCode: 400,
      message: error.details.map((e) => e.message),
    };
  } else {
    var con = mysql.createConnection({
      host: "db-manager-umg.cusjupztirzz.us-east-1.rds.amazonaws.com",
      user: "admin",
      password: "d2cany8bdwypjtACDvaq",
      database: "test",
    });

    con.connect(function (err) {
      if (err) {
        response = {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            statusCode: 400,
            message: "Connection Error",
          }),
        };
        callback(null, response);
      }
      con.query("SELECT * FROM Connections", function (err, result, fields) {
        if (err) {
          console.log(err);
          response = {
            statusCode: 400,
            headers,
            body: JSON.stringify({ statusCode: 400, message: err }),
          };
          callback(null, response);
        }
        console.log(result);
        console.log(fields);
        response = {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            statusCode: 200,
            data: result,
          }),
        };
        callback(null, response);
      });
    });
  }
};

const insertConnection = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let response = {
    statusCode: 409,
    headers,
    body: JSON.stringify({
      message: "Error getting branches, check parameters.",
    }),
  };

  const body = getBody(event) || {};
  const data = {
    ...body,
    ...event.pathParameters,
    ...event.queryStringParameters,
  };
  console.info(`data ${JSON.stringify(data)}`);

  const { error, value } = schema.insertConnection.validate(data, {
    abortEarly: false,
  });

  if (error) {
    response = {
      error: true,
      statusCode: 400,
      message: error.details.map((e) => e.message),
    };
  } else {
    console.info(`value ${JSON.stringify(value)}`);
    const { name, host, user, password } = value;
    console.info(`Login to DB with: host: ${host}, user ${user}`);

    if (event.headers.Authorization) {
      try {
        const decodeSignature = jwt.verify(
          event.headers.Authorization,
          "umg2022"
        );
        console.log("decodeSignature", JSON.stringify(decodeSignature));

        var con = mysql.createConnection({
          host: "db-manager-umg.cusjupztirzz.us-east-1.rds.amazonaws.com",
          user: "admin",
          password: "d2cany8bdwypjtACDvaq",
          database: "test",
        });

        con.connect(function (err) {
          if (err) {
            response = {
              statusCode: 400,
              headers,
              body: JSON.stringify({
                statusCode: 400,
                message: "Connection Error",
              }),
            };
            callback(null, response);
          }
          con.query(
            `insert into Connections (Name, Host, User, Password) values ('${name}', '${host}', '${user}', '${password}')`,
            function (err, result, fields) {
              if (err) {
                console.log(err);
                response = {
                  statusCode: 400,
                  headers,
                  body: JSON.stringify({
                    statusCode: 400,
                    message: err,
                  }),
                };
                callback(null, response);
              }
              console.log(result);
              console.log(fields);
              response = {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                  statusCode: 200,
                  data: { message: "Connection Save Successfully" },
                }),
              };
              callback(null, response);
            }
          );
        });
      } catch (error) {
        response = {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            statusCode: 401,
            message: "Token invalido",
          }),
        };
        callback(null, response);
      }
    } else {
      response = {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          statusCode: 401,
          message: "Se necesita Token para avanzar",
        }),
      };
      callback(null, response);
    }
  }
};

const getDatabases = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let response = {
    statusCode: 409,
    headers,
    body: JSON.stringify({
      message: "Error getting branches, check parameters.",
    }),
  };
  const body = getBody(event) || {};
  const data = {
    ...body,
    ...event.pathParameters,
    ...event.queryStringParameters,
  };
  console.info(`data ${JSON.stringify(data)}`);

  const { error, value } = schema.getDatabases.validate(data, {
    abortEarly: false,
  });
  console.info(`value ${JSON.stringify(value)}`);

  if (error) {
    response = {
      error: true,
      statusCode: 400,
      message: error.details.map((e) => e.message),
    };
  } else {
    console.info(`value ${JSON.stringify(value)}`);
    const { host, user, password } = value;
    console.info(`Login to DB with: host: ${host}, user ${user}`);

    if (event.headers.Authorization) {
      try {
        const decodeSignature = jwt.verify(
          event.headers.Authorization,
          "umg2022"
        );
        console.log("decodeSignature", JSON.stringify(decodeSignature));

        var con = mysql.createConnection({
          host,
          user,
          password,
        });

        con.connect(function (err) {
          if (err) {
            response = {
              statusCode: 400,
              headers,
              body: JSON.stringify({
                statusCode: 400,
                message: "Connection Error",
              }),
            };
            callback(null, response);
          }
          con.query("SHOW DATABASES", function (err, result, fields) {
            if (err) {
              console.log(err);
              response = {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                  statusCode: 400,
                  message: err,
                }),
              };
              callback(null, response);
            }
            console.log(result);
            console.log(fields);
            const filterResult = result.filter(
              (res) =>
                res.Database !== "information_schema" &&
                res.Database !== "mysql" &&
                res.Database !== "performance_schema" &&
                res.Database !== "sys"
            );
            console.log(filterResult);
            response = {
              statusCode: 200,
              headers,
              body: JSON.stringify({
                statusCode: 200,
                data: filterResult,
              }),
            };
            callback(null, response);
          });
        });
      } catch (error) {
        response = {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            statusCode: 401,
            message: "Token invalido",
          }),
        };
        callback(null, response);
      }
    } else {
      response = {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          statusCode: 401,
          message: "Se necesita Token para avanzar",
        }),
      };
      callback(null, response);
    }
  }
};

const getTables = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let response = {
    statusCode: 409,
    headers,
    body: JSON.stringify({
      message: "Error getting branches, check parameters.",
    }),
  };

  const body = getBody(event) || {};
  const data = {
    ...body,
    ...event.pathParameters,
    ...event.queryStringParameters,
  };
  console.info(`data ${JSON.stringify(data)}`);

  const { error, value } = schema.getTables.validate(data, {
    abortEarly: false,
  });
  console.info(`value ${JSON.stringify(value)}`);

  if (error) {
    response = {
      error: true,
      statusCode: 400,
      message: error.details.map((e) => e.message),
    };
  } else {
    console.info(`values ${JSON.stringify(value)}`);
    const { host, user, password, database } = value;
    console.info(`value ${JSON.stringify(value)}`);
    console.info(`Login to DB with: host: ${host}, user ${user}`);

    if (event.headers.Authorization) {
      try {
        const decodeSignature = jwt.verify(
          event.headers.Authorization,
          "umg2022"
        );
        console.log("decodeSignature", JSON.stringify(decodeSignature));

        var con = mysql.createConnection({
          host,
          user,
          password,
          database,
        });

        con.connect(function (err) {
          if (err) {
            response = {
              statusCode: 400,
              headers,
              body: JSON.stringify({
                statusCode: 400,
                message: "Connection Error",
              }),
            };
            callback(null, response);
          }
          con.query("SHOW TABLES", function (err, result, fields) {
            if (err) {
              console.log(err);
              response = {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                  statusCode: 400,
                  message: err,
                }),
              };
              callback(null, response);
            }
            console.log(result);
            console.log(fields);
            const tables = [];
            result.map((res) => {
              console.log(JSON.stringify(res));
              console.log(JSON.stringify(res[`Tables_in_${database}`]));
              tables.push({ table: res[`Tables_in_${database}`] });
            });
            response = {
              statusCode: 200,
              headers,
              body: JSON.stringify({
                statusCode: 200,
                data: tables,
              }),
            };
            callback(null, response);
          });
        });
      } catch (error) {
        response = {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            statusCode: 401,
            message: "Token invalido",
          }),
        };
        callback(null, response);
      }
    } else {
      response = {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          statusCode: 401,
          message: "Se necesita Token para avanzar",
        }),
      };
      callback(null, response);
    }
  }
};

module.exports = {
  login,
  querys,
  getConnections,
  insertConnection,
  getDatabases,
  getTables,
};
