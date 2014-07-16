<h1><i class="fa fa-envelope-o"></i> Emailer (Postmark)</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			<p>
				Postmark removes the headaches of delivering and parsing transactional email for webapps with minimal setup time and zero maintenance. We have years of experience getting email to the inbox, so you can work and rest easier.
			</p>
			<p>
				Use our Send API or our simple SMTP interface to start sending in minutes, &amp; use our Inbound API to easily parse incoming emails.
			</p>
		</blockquote>
		<p>
			To get started:
		</p>
		<ol>
			<li>
				Register for an account on <a href="https://postmarkapp.com/">https://postmarkapp.com/</a>.
			</li>
			<li>
				Paste your API key (not your public key) into the field below, hit save, and restart your NodeBB
			</li>
		</ol>
	</div>
</div>

<hr />

<form role="form">
	<fieldset>
		<div class="row">
			<div class="col-sm-6">
				<div class="form-group">
					<label for="postmark:apiKey">API Key</label>
					<input type="text" class="form-control" id="postmark:apiKey" data-field="postmark:apiKey" />
				</div>
			</div>
		</div>

		<button class="btn btn-lg btn-primary" id="save">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['forum/admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>