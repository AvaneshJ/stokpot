import { send } from "process";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompt";
import { sendWelcomeEmail } from "../nodemailer";

export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    // 1. Extract data immediately at the top level
    const {
      email,
      name,
      country,
      investmentGoals,
      riskTolerance,
      preferredIndustry,
    } = event.data;

    // Log this to your terminal to confirm the data exists before the AI step
    console.log("Inngest received event for:", email);

    const userProfile = `
        -Country: ${country}
        -Investment Goals: ${investmentGoals}
        -Risk Tolerance: ${riskTolerance}
        -Preferred Industry: ${preferredIndustry}`;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );

    // 2. AI Inference
    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
      body: {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
    });

    // 3. Email Sending Step
    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joining Stokpot. You now have the tools to track markets and make smarter moves";

      // Use the variables destructured at the top level
      if (!email) {
        throw new Error("Cannot send email: recipient address is undefined");
      }

      return await sendWelcomeEmail({
        email: email,
        name: name,
        intro: introText,
      });
    });

    return { success: true };
  }
);
