import React from 'react';
import './terms.scss';
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <section className='mainSection'>
      <div className='breadcrumbsDiv'>
        <span>
          <Link to='/frontpage' className='bclink'>
            <img src={HomeIcon} alt='homeicon' />
            <span className='bcmarginleft'>Forside</span>
          </Link>
          <span className='colorgrey'>\</span>
          Salgs- og handelsbetingelser
        </span>
      </div>
      <div className='maincontentgrid'>
        <Sidenav />
        <div>
          <h2>Salgs- og Handelsbetingelser</h2>
          <h3>Betaling</h3>
          <p>
            Strings online modtager betaling med Dankort/VISA-Dankort, VISA,
            VISA Electron, Mastercard og JCB. Betaling vil først blive trukket
            på din konto, når varen afsendes.
          </p>
          <p>Alle beløb er i DKK. Danske kroner og er incl. moms.</p>
          <p>
            Strings online bruger en godkendt betalingsserver, der krypterer
            alle dine kortoplysninger med SSL (Secure Socket Layer) protokol.
            Det betyder, at man ikke kan aflæse dine informationer.
          </p>
          <h3>Levering</h3>
          <p>
            Strings online leverer på alle hverdage, med ordre indgået inden kl.
            12.00
          </p>
          <h3>Reklamationsret</h3>
          <p>
            Der gives 2 års reklamationsret i henhold til købeloven. Vores
            reklamationsret gælder for fejl i materiale og/eller fabrikation.
          </p>
          <p>
            Reklamationen gælder ikke fejl eller skader begået ved forkert
            betjening af produktet / ydelsen.
          </p>
          <p>
            Strings online vil dække returneringsomkostninger i et rimeligt
            omfang.
          </p>
          <p>
            Ved returnering Rettes henvendelse til og reklamationer sendes til:
          </p>
          <p>Strings online</p>
          <p>ADRESSEVEJ 4</p>
          <p>9999 BYNAVN</p>

          <p>Der modtages ikke pakker sendt på efterkrav.</p>
          <h3>Refusion</h3>
          <p>
            Hvis der er aftalt refusion, så bedes I sende jeres bankoplysninger,
            så vi kan overføre det aftalte beløb.
          </p>
          <h3>Fortrydelsesret</h3>
          <p>
            Der gives 14 dages fuld returret på varer købt i vores Webshop.
            Perioden regnes fra den dag, hvor du modtager ordren.
          </p>
          <p>Returneringsomkostninger skal du selv afholde.</p>
          <p>
            Fortrydelse skal anmeldes til os senest 14 efter købet og fra
            fortrydelsen skal I senest 14 dage efter returnere forsendelsen.
          </p>
          <p>
            Meddelelsen skal gives pr. mail på info@domæne.dk. I meddelelsen
            skal du gøre os tydeligt opmærksom på, at du ønsker at udnytte din
            fortrydelsesret. Du kan også vælge at benytte vores standard
            fortrydelsesformular og sende med retur. Den finder du her (INDSÆT
            LINK TIL FORTRYDELSESFORMULAR)
          </p>
          <p>
            Varens stand, når du sender den retur Du hæfter kun for eventuel
            forringelse af varens værdi, som skyldes anden håndtering, end hvad
            der er nødvendigt for at fastslå varens art, egenskaber og den måde,
            den fungerer på. Med andre ord – du kan prøve varen på samme måde,
            som hvis du prøvede den i en fysisk butik.
          </p>
          <p>
            Hvis varen er prøvet udover, hvad der er beskrevet ovenfor,
            betragter vi den som brugt, hvilket betyder, at du ved fortrydelse
            af købet kun får en del eller intet af købsbeløbet retur, afhængig
            af varens handelsmæssige værdi.
          </p>
          <p>
            For at modtage hele købsbeløbet retur må du altså gøre det samme,
            som man kan i en fysisk butik. Du må afprøve varen, men ikke tage
            den i egentlig brug.
          </p>
          <h3>Klagemuligheder – oversigt og links:</h3>
          <p>
            Har du en klage over et produkt, købt i vores Webshop, kan der
            sendes en klage til:
          </p>
          <p>Center for Klageløsning</p>
          <p>Nævnenes Hus, Toldboden 2</p>
          <p>8800 Viborg</p>

          <p>
            Du kan klage til Center for Klageløsning via Klageportalen for
            Nævnenes Hus: https://kpo.naevneneshus.dk/
          </p>
          <p>
            Hvis du er forbruger med bopæl i et andet EU-land, kan du angive din
            klage i EU Kommissionens online klageplatform.
          </p>
          <p>
            Platformen findes her: http://ec.europa.eu/odr Angiver du en klage
            her, skal du oplyse vores E-mail adresse: info@domæne.dk
          </p>
        </div>
      </div>
    </section>
  );
}

export default Terms;
