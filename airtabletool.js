// middleware for airtable manipulation

const server = require("server");
const delay = require("delay");
const moment = require("moment");
require("moment-timezone");
var Airtable = require("airtable");

const { get, post } = server.router;
const { error } = server.router;
const { status } = server.reply;

var base = new Airtable({ apiKey: "keytmUIbRw9S7suAP" }).base(
  "appxpzku3j8rHLXUp"
);

const latestRecord = async (cb) => {
  base("lars")
    .select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 1,
      sort: [{field: "bed", direction: "desc"}],
      view: "Grid view"
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          console.log("Retrieved", record);
          cb(record.id)
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
};


const port = 5543;
server({ port }, [
  get("/sleepdiary/:button", async ctx => {
    console.log("going", ctx.params.button);

    base("lars").create(
      [
        {
          fields: {
            "La meg": moment()
              .tz("Europe/Oslo")
              .format()
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.getId());
        });
      }
    );

    // latestRecr

    return "yeah";
  }),
  error(ctx => status(500).send(ctx.error.message))
]);

console.log("http://localhost:" + port + "/");
