/**
 * Created by avohra on 6/17/2017.
 */

export class APIURLRepo {

  private static readonly API_PROTOCOL: string = 'http';

  private static readonly API_DOMAIN_ENDPOINT: string = 'localhost:8080';

  private static readonly API_DOCUMENT_NAMESPACE: string = 'cpha-rest-ws/document';

  public static readonly API_DOCUMENTS_NAMESPACE: string = 'cpha-rest-ws/documents';

  public static readonly API_DOCUMENT_URL: string = APIURLRepo.API_PROTOCOL + '://' +
    APIURLRepo.API_DOMAIN_ENDPOINT + '/' + APIURLRepo.API_DOCUMENT_NAMESPACE ;

  public static readonly API_DOCUMENTS_URL: string = APIURLRepo.API_PROTOCOL + '://' +
    APIURLRepo.API_DOMAIN_ENDPOINT + '/' + APIURLRepo.API_DOCUMENTS_NAMESPACE ;

  public static readonly LOOK_UP_URL: string = APIURLRepo.API_DOCUMENT_URL + '/search';

  public static readonly AUTOCOMPLETE_LOOK_UP_URL: string = APIURLRepo.LOOK_UP_URL + '/autocomplete';

  public static readonly EXACT_DRUG_LOOK_UP: string = APIURLRepo.API_PROTOCOL + '://' +
    APIURLRepo.API_DOMAIN_ENDPOINT + '/' + APIURLRepo.API_DOCUMENTS_NAMESPACE ;

}
