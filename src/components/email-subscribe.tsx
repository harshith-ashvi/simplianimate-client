import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmailSubscribe = () => {
  return (
    <>
      <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
      <form
        action="https://app.convertkit.com/forms/6715592/subscriptions"
        method="post"
        data-sv-form="6715592"
        data-uid="fc0f94be76"
        data-format="inline"
        data-version="5"
        data-options='{"settings":{"after_subscribe":{"action":"redirect","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":"Success! Now check your email to confirm your subscription. SimpliAnimate"},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
        min-width="400 500 600 700 800"
      >
        <div data-style="clean" className="bg-orange-100 py-4">
          <ul data-element="errors" data-group="alert"></ul>
          <div
            data-element="fields"
            data-stacked="false"
            className="flex items-center justify-center max-container gap-2 p-4 max-sm:flex-wrap"
          >
            <Input
              aria-label="Name"
              name="fields[first_name]"
              required={true}
              placeholder="Name"
              type="text"
            />
            <Input
              name="email_address"
              aria-label="Email Address"
              placeholder="Email Address"
              required={true}
              type="email"
            />
            <Button data-element="submit">Subscribe</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EmailSubscribe;
