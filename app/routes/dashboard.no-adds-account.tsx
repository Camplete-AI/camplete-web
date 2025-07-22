export default function NoAdsAccountPage() {
  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold">Conta Google Ads não encontrada</h1>
      <p className="mt-4 text-muted-foreground">
        Não encontramos uma conta Google Ads vinculada ao seu e-mail.
      </p>
      <p className="mt-2">
        Você pode criar uma conta gratuitamente clicando no botão abaixo.
      </p>
      <a
        href="https://ads.google.com/home/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-md"
      >
        Criar conta Google Ads
      </a>
    </div>
  );
}
