import {Redirect} from '@docusaurus/router';

// The old /subscribe page is retired — every distributable now lives on the
// dedicated /download page. Keep this route as a redirect so old links from
// blog posts, the web app, and external sites keep working.
export default function Subscribe() {
  return <Redirect to="/download" />;
}
