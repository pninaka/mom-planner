using MomPlannerAPI.Models;

namespace MomPlannerAPI.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext db)
    {
        if (db.Recipes.Any()) return;

        db.Recipes.AddRange(
            // ארוחות צהריים
            new Recipe { Title = "פסטה ברוטב עגבניות", Category = "צהריים", Ingredients = "פסטה, עגבניות מרוסקות, שום, שמן זית, בזיליקום", Instructions = "מבשלים פסטה, מטגנים שום, מוסיפים עגבניות, מבשלים 15 דקות, מערבבים עם פסטה." },
            new Recipe { Title = "אורז עם ירקות", Category = "צהריים", Ingredients = "אורז, גזר, פלפל, אפונה, רוטב סויה", Instructions = "מבשלים אורז, מטגנים ירקות, מערבבים יחד עם רוטב סויה." },
            new Recipe { Title = "קציצות עוף בתנור", Category = "צהריים", Ingredients = "חזה עוף טחון, בצל, ביצה, פירורי לחם, תבלינים", Instructions = "מערבבים את כל המרכיבים, מעצבים קציצות, אופים 25 דקות ב-180°." },
            new Recipe { Title = "מרק עוף קלאסי", Category = "צהריים", Ingredients = "עוף, גזר, סלרי, בצל, פטרוזיליה, אטריות", Instructions = "מבשלים עוף עם ירקות שעה וחצי, מסננים, מוסיפים אטריות." },
            new Recipe { Title = "תבשיל עדשים", Category = "צהריים", Ingredients = "עדשים כתומות, בצל, שום, כמון, כורכום, עגבניות", Instructions = "מטגנים בצל ושום, מוסיפים עדשים ועגבניות, מבשלים 30 דקות עם תבלינים." },
            new Recipe { Title = "שניצל עם פירה", Category = "צהריים", Ingredients = "חזה עוף, ביצה, פירורי לחם, תפוחי אדמה, חמאה, חלב", Instructions = "מפטמים עוף, מטגנים שניצל. מבשלים תפו\"א, עושים פירה עם חמאה וחלב." },
            new Recipe { Title = "דג בתנור עם לימון", Category = "צהריים", Ingredients = "פילה דג, לימון, שום, שמן זית, פטרוזיליה, מלח ופלפל", Instructions = "מניחים דג בתבנית, מכסים בלימון, שום ושמן, אופים 20 דקות ב-200°." },
            new Recipe { Title = "חומוס ביתי", Category = "צהריים", Ingredients = "חומוס מבושל, טחינה, לימון, שום, מלח, שמן זית", Instructions = "טוחנים חומוס עם כל המרכיבים במעבד מזון עד לקרמי." },
            new Recipe { Title = "אומלט גבינה וירקות", Category = "צהריים", Ingredients = "ביצים, גבינה צהובה, פלפל, עגבנייה, מלח", Instructions = "טורפים ביצים, מוסיפים ירקות קצוצים, מטגנים ומוסיפים גבינה." },
            new Recipe { Title = "פיתות עם פלאפל", Category = "צהריים", Ingredients = "חומוס מבושל, בצל, שום, כוסברה, כמון, שמן לטיגון, פיתות", Instructions = "טוחנים חומוס עם תבלינים, מעצבים כדורים, מטגנים בשמן עמוק." },

            // ארוחות ערב
            new Recipe { Title = "ביצה עין עם לחם", Category = "ערב", Ingredients = "ביצים, שמן, לחם, מלח ופלפל", Instructions = "מחממים שמן במחבת, שוברים ביצה, מטגנים לרמה הרצויה." },
            new Recipe { Title = "גבינות ולחם כפרי", Category = "ערב", Ingredients = "לחם כפרי, גבינה לבנה, גבינה צהובה, עגבניות, מלפפון, זיתים", Instructions = "פורסים לחם, מסדרים גבינות וירקות, מגישים." },
            new Recipe { Title = "שקשוקה", Category = "ערב", Ingredients = "עגבניות, פלפלים, בצל, ביצים, שמן זית, פפריקה, כמון", Instructions = "מטגנים ירקות, מוסיפים ביצים בכוסות, מכסים ומבשלים 8 דקות." },
            new Recipe { Title = "פנקייקים מלוחים", Category = "ערב", Ingredients = "קמח, ביצה, חלב, אבקת אפייה, גבינה, מלח", Instructions = "מערבבים מרכיבים, יוצקים על מחבת חמה, מטגנים משני הצדדים." },
            new Recipe { Title = "טוסט גבינה ועגבנייה", Category = "ערב", Ingredients = "לחם לבן, גבינה צהובה, עגבנייה, קצת אורגנו", Instructions = "מניחים גבינה ועגבנייה על לחם, אופים בטוסטר עד שהגבינה נמסה." },
            new Recipe { Title = "סלט ירקות עם גבינה", Category = "ערב", Ingredients = "עגבנייה, מלפפון, פלפל, בצל, גבינה בולגרית, שמן זית, לימון", Instructions = "קוצצים ירקות, מוסיפים גבינה מפוררת, מתבלים בשמן ולימון." },
            new Recipe { Title = "קרפים עם ריבה", Category = "ערב", Ingredients = "קמח, ביצה, חלב, חמאה, סוכר, ריבה", Instructions = "מערבבים בלילה, יוצקים שכבה דקה על מחבת, מטגנים, מגלגלים עם ריבה." },
            new Recipe { Title = "מרק עגבניות", Category = "ערב", Ingredients = "עגבניות, בצל, שום, ציר ירקות, שמנת, תבלינים", Instructions = "מטגנים בצל ושום, מוסיפים עגבניות וציר, מבשלים 20 דקות, טוחנים ומוסיפים שמנת." },
            new Recipe { Title = "לחמניות עם ממרחים", Category = "ערב", Ingredients = "לחמניות, חמאת בוטנים, דבש, ריבה, גבינה", Instructions = "פורסים לחמניות, מסדרים ממרחים שונים, מגישים." },
            new Recipe { Title = "תירס עם חמאה", Category = "ערב", Ingredients = "תירס קפוא, חמאה, מלח", Instructions = "מבשלים תירס, מוסיפים חמאה ומלח, מגישים חם." }
        );

        db.Activities.AddRange(
            // 0-2
            new Activity { Title = "שירי ערש והרגעה", Description = "שרו לתינוק שירי ערש קצביים תוך כדי נדנדה עדינה — מפתח שמיעה וקשר רגשי.", MinAge = 0, MaxAge = 2 },
            new Activity { Title = "בועות סבון", Description = "פוצצו בועות סבון ותנו לתינוק לנסות לעקוב אחריהן — מפתח ראייה ומוטוריקה.", MinAge = 0, MaxAge = 2 },
            new Activity { Title = "ספרי תמונות", Description = "הצביעו על תמונות בספרים קשיחים ואמרו את שמות החפצים — מפתח שפה.", MinAge = 0, MaxAge = 2 },
            new Activity { Title = "משחקי מים", Description = "שמו קצת מים בגיגית קטנה ותנו לתינוק לשחק — חוויה חושית נהדרת.", MinAge = 1, MaxAge = 2 },
            new Activity { Title = "מגדל קוביות", Description = "הניחו קוביות רכות ובנו מגדל ביחד, תנו לפעוט להפיל!", MinAge = 1, MaxAge = 2 },

            // 2-5
            new Activity { Title = "ציור באצבעות", Description = "הכינו צבעי אצבעות בטוחים ותנו לילד לצייר בחופשיות על דף גדול.", MinAge = 2, MaxAge = 5 },
            new Activity { Title = "בצק מלוח ביתי", Description = "הכינו ביחד בצק מלוח (קמח+מלח+מים) לפיסול — שעות של יצירה.", MinAge = 2, MaxAge = 5 },
            new Activity { Title = "פאזל פשוט", Description = "פאזל של 4-12 חלקים עם תמונות מוכרות — מפתח חשיבה מרחבית.", MinAge = 2, MaxAge = 5 },
            new Activity { Title = "סיפור אינטראקטיבי", Description = "ספרו סיפור ותנו לילד להשלים חלקים ('ואז הדב אמר...'). ", MinAge = 2, MaxAge = 5 },
            new Activity { Title = "ריקוד חופשי", Description = "הדליקו מוזיקה שמחה ורקדו ביחד! מפתח גוף ומצב רוח.", MinAge = 2, MaxAge = 5 },
            new Activity { Title = "גינון בעציץ", Description = "שתלו ביחד זרעים בעציץ קטן ועקבו יחד אחרי הצמיחה.", MinAge = 3, MaxAge = 5 },

            // 6-12
            new Activity { Title = "קיפול אוריגמי", Description = "למדו יחד לקפל ספינה, כלב או טיל נייר — מפתח ריכוז ומוטוריקה עדינה.", MinAge = 6, MaxAge = 12 },
            new Activity { Title = "משחק קופסה משפחתי", Description = "שחקו טריוויה, שחמט, אונו, קטן-גדול — תחרות בריאה ובילוי משפחתי.", MinAge = 6, MaxAge = 12 },
            new Activity { Title = "אפייה ביחד", Description = "אפו עוגיות או עוגה פשוטה — הילד אחראי על ערבוב ועיצוב.", MinAge = 6, MaxAge = 12 },
            new Activity { Title = "בניית לגו", Description = "פרויקט לגו גדול או יצירה חופשית — מפתח הנדסה וסבלנות.", MinAge = 6, MaxAge = 12 },
            new Activity { Title = "גינת ירקות", Description = "טפלו ביחד בגינה קטנה — שתילה, השקיה, קטיף.", MinAge = 6, MaxAge = 12 },
            new Activity { Title = "כתיבת סיפור", Description = "כתבו ביחד סיפור בעל פרקים — כל יום פרק חדש.", MinAge = 8, MaxAge = 12 },

            // 13+
            new Activity { Title = "בישול ארוחה שלמה", Description = "הטינאייג'ר אחראי על ארוחת ערב — תכנון, קנייה ובישול עצמאי.", MinAge = 13, MaxAge = 18 },
            new Activity { Title = "עיצוב חדר", Description = "שפצו ביחד פינה בחדר — צבע, מדפים, סידור מחדש.", MinAge = 13, MaxAge = 18 },
            new Activity { Title = "פרויקט צילום", Description = "צאו לצלם בשכונה או בבית — נושא חופשי, הכינו תערוכה קטנה.", MinAge = 13, MaxAge = 18 },
            new Activity { Title = "לימוד נגינה", Description = "שיעורי יוטיוב לגיטרה, פסנתר או כלי נשיפה — עצמאית.", MinAge = 13, MaxAge = 18 },
            new Activity { Title = "מיזם קטן מהבית", Description = "חשבו על שירות קטן שאפשר לתת לשכנים — כסף כיס ואחריות.", MinAge = 14, MaxAge = 18 }
        );

        db.SaveChanges();
    }
}
