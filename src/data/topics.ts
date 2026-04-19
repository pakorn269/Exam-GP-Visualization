import type { Topic } from "../types";
import { series } from "./topics/series";
import { math } from "./topics/math";
import { table } from "./topics/table";
import { sym } from "./topics/sym";
import { logic } from "./topics/logic";
import { sentences, article } from "./topics/thai";
import { en_conv, en_gram, en_read } from "./topics/english";
import { law_admin, law_procedure, law_governance, law_ethics } from "./topics/law";

export let TOPICS: Record<string, Topic> = {
      series,
      math,
      table,
      sym,
      logic,
      sentences,
      article,
      en_conv,
      en_gram,
      en_read,
      law_admin,
      law_procedure,
      law_governance,
      law_ethics
    };
