import * as shell from "shelljs";

shell.mkdir("-p", "dist/mails");

shell.cp("-R", "mails/*.ejs", "dist/mails");
